package com.db.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.db.backend.converter.RestaurantConverter;
import com.db.backend.dto.AddressDTO;
import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Address;
import com.db.backend.entity.Restaurant;
import com.db.backend.entity.User;
import com.db.backend.entity.Vote;
import com.db.backend.entity.Voting;
import com.db.backend.infra.exception.InvalidVoteException;
import com.db.backend.repository.UserRepository;
import com.db.backend.repository.VoteRepository;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VoteServiceTest {

  @Mock
  private VotingService votingService;

  @Mock
  private RestaurantService restaurantService;
  @Mock
  private RestaurantConverter restaurantConverter;

  @Mock
  private UserRepository userRepository;

  @Mock
  private VoteRepository voteRepository;

  @InjectMocks
  private VoteService voteService;

  private User user;
  private Voting currentVoting;
  private AddressDTO addressDTO;
  private RestaurantDTO restaurantDTO;
  private Restaurant restaurant;

  @BeforeEach
  void setup() {
    user = new User();
    user.setId(1L);
    user.setVotes(new ArrayList<>());

    currentVoting = new Voting();
    currentVoting.setId(1L);
    currentVoting.setClosed(false);

    addressDTO = new AddressDTO(
        "123",
        "12345",
        "Neighborhood",
        "Street",
        "City",
        "State");

    restaurantDTO = new RestaurantDTO(
        "Restaurant Name",
        "Description",
        "www.restaurant.com",
        "image.jpg",
        addressDTO,
        false);

    restaurant = new Restaurant();
    restaurant.setId(1L);
    restaurant.setWinnerBlock(false);
  }

  @Test
  void registerVote_should_create_vote_with_correct_user_and_restaurant() {
    when(votingService.getCurrentVotingEntity()).thenReturn(currentVoting);
    when(voteService.getRestaurantToVote(any())).thenReturn(restaurant);
    when(voteRepository.save(any(Vote.class))).thenAnswer(invocation -> invocation.getArgument(0));

    Vote vote = voteService.registerVote(user, restaurantDTO);

    assertNotNull(vote);
    assertEquals(1L, vote.getUser().getId());
    assertEquals(1L, vote.getRestaurant().getId());
    assertFalse(vote.getRestaurant().getWinnerBlock());
    assertEquals(1L, vote.getVoting().getId());

    verify(voteRepository, times(1)).save(vote);
  }

  @Test
  void registerVote_should_not_create_vote_for_blocked_restaurant() {
    restaurant.setWinnerBlock(true);
    when(votingService.getCurrentVotingEntity()).thenReturn(currentVoting);
    when(voteService.getRestaurantToVote(any())).thenReturn(restaurant);

    assertThrows(InvalidVoteException.class, () -> {
      voteService.registerVote(user, restaurantDTO);
    });
  }

  @Test
  void registerVote_should_not_create_vote_for_closed_voting() {
    currentVoting.setClosed(true);
    when(votingService.getCurrentVotingEntity()).thenReturn(currentVoting);
    when(voteService.getRestaurantToVote(any())).thenReturn(restaurant);

    assertThrows(InvalidVoteException.class, () -> {
      voteService.registerVote(user, restaurantDTO);
    });
  }

  @Test
  void getRestaurantToVote_should_return_same_restaurant_from_dto() {
    Restaurant restaurant = new Restaurant(restaurantDTO.name(),
        restaurantDTO.description(),
        restaurantDTO.website(),
        restaurantDTO.image(),
        new Address(
            addressDTO.number(),
            addressDTO.postCode(),
            addressDTO.neighborhood(),
            addressDTO.street(),
            addressDTO.city(),
            addressDTO.state()));

    when(restaurantConverter.getExistingRestaurant(restaurantDTO)).thenReturn(restaurant);

    Restaurant restaurantToVote = voteService.getRestaurantToVote(restaurantDTO);

    assertEquals(restaurant, restaurantToVote);
  }

  @Test
  void getRestaurantToVote_should_create_restaurant_from_dto_if_doesnt_exist() {
    Restaurant restaurant = new Restaurant(restaurantDTO.name(),
        restaurantDTO.description(),
        restaurantDTO.website(),
        restaurantDTO.image(),
        new Address(
            addressDTO.number(),
            addressDTO.postCode(),
            addressDTO.neighborhood(),
            addressDTO.street(),
            addressDTO.city(),
            addressDTO.state()));

    when(restaurantConverter.getExistingRestaurant(restaurantDTO)).thenReturn(null);
    when(restaurantService.registerRestaurant(restaurantDTO)).thenReturn(restaurantDTO);
    when(restaurantConverter.convertToEntity(restaurantDTO)).thenReturn(restaurant);

    Restaurant restaurantToVote = voteService.getRestaurantToVote(restaurantDTO);

    assertNotNull(restaurantToVote);
    assertEquals(restaurantDTO.name(), restaurantToVote.getName());
    assertEquals(restaurantDTO.address().number(), restaurantToVote.getAddress().getNumber());
    assertEquals(restaurantDTO.address().postCode(), restaurantToVote.getAddress().getPostCode());
  }

  @Test
  void getExistingVote_should_return_empty_if_current_voting_has_no_votes() {
    User user = new User();
    user.setEmail("user@example.com");

    Optional<Vote> existingVote = voteService.getExistingVote(currentVoting, user);

    assertTrue(existingVote.isEmpty());
  }

  @Test
  void getExistingVote_should_return_empty_if_user_hasnt_voted_in_current_voting() {
    User user = new User();
    user.setEmail("user@example.com");

    Vote vote = new Vote();
    vote.setUser(new User());
    vote.getUser().setEmail("otheruser@example.com");

    currentVoting.getVotes().add(vote);

    Optional<Vote> result = voteService.getExistingVote(currentVoting, user);

    assertTrue(result.isEmpty());
  }

  @Test
  void getExistingVote_should_return_users_vote_in_current_voting() {
    User user = new User();
    user.setEmail("user@example.com");

    Vote vote = new Vote();
    vote.setUser(user);

    currentVoting.getVotes().add(vote);

    Optional<Vote> result = voteService.getExistingVote(currentVoting, user);

    assertTrue(result.isPresent());
    assertEquals(user.getEmail(), result.get().getUser().getEmail());
  }
}
