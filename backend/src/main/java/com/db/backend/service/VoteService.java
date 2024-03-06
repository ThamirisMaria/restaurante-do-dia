package com.db.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.db.backend.converter.RestaurantConverter;
import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Restaurant;
import com.db.backend.entity.User;
import com.db.backend.entity.Vote;
import com.db.backend.entity.Voting;
import com.db.backend.infra.exception.DuplicateVoteException;
import com.db.backend.infra.exception.InvalidVoteException;
import com.db.backend.repository.UserRepository;
import com.db.backend.repository.VoteRepository;

@Service
public class VoteService {

  @Autowired
  private VoteRepository voteRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RestaurantConverter restaurantConverter;
  @Autowired
  private RestaurantService restaurantService;

  @Autowired
  private VotingService votingService;

  public Vote registerVote(User user, RestaurantDTO restaurantDTO) {
    Voting currentVoting = votingService.getCurrentVotingEntity();

    Restaurant restaurantToVote = restaurantConverter.getExistingRestaurant(restaurantDTO);
    if (restaurantToVote == null) {
      restaurantDTO = restaurantService.registerRestaurant(restaurantDTO);
      restaurantToVote = restaurantConverter.convertToEntity(restaurantDTO);
    }

    if (currentVoting.getClosed()) {
      throw new InvalidVoteException("Voting session is closed for today");
    }

    if (restaurantToVote.getWinnerBlock()) {
      throw new InvalidVoteException("This restaurant is not available for votes untill the end of this week");
    }

    Optional<Vote> existingVote = getExistingVote(currentVoting, user);

    if (existingVote.isPresent()) {
      Vote vote = existingVote.get();

      if (vote.getRestaurant().equals(restaurantToVote)) {
        throw new DuplicateVoteException("User has already voted for this restaurant");
      }

      vote.setRestaurant(restaurantToVote);

      restaurantToVote.getVotes().add(vote);
      restaurantService.registerRestaurant(restaurantDTO);
      user.getVotes().add(vote);
      userRepository.save(user);

      return voteRepository.save(vote);
    } else {

      Vote newVote = new Vote(
          user,
          restaurantToVote,
          currentVoting);
      return voteRepository.save(newVote);
    }
  }

  private Optional<Vote> getExistingVote(Voting currentVoting, User user) {
    return currentVoting.getVotes().stream()
        .filter(vote -> vote.getUser().getEmail().equals(user.getEmail()))
        .findFirst();
  }
}
