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
import com.db.backend.entity.Restaurant;
import com.db.backend.entity.User;
import com.db.backend.entity.Vote;
import com.db.backend.entity.Voting;
import com.db.backend.infra.exception.InvalidVoteException;
import com.db.backend.repository.UserRepository;
import com.db.backend.repository.VoteRepository;

import java.util.ArrayList;

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

}
