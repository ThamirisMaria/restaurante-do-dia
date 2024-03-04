package com.db.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.db.backend.converter.RestaurantConverter;
import com.db.backend.converter.UserConverter;
import com.db.backend.dto.RestaurantDTO;
import com.db.backend.dto.UserDTO;
import com.db.backend.entity.Restaurant;
import com.db.backend.entity.User;
import com.db.backend.entity.Vote;
import com.db.backend.entity.Voting;
import com.db.backend.infra.exception.DuplicateVoteException;
import com.db.backend.infra.exception.InvalidVoteException;
import com.db.backend.repository.VoteRepository;

@Service
public class VoteService {

  @Autowired
  private VoteRepository voteRepository;

  @Autowired
  private UserConverter userConverter;

  @Autowired
  private RestaurantConverter restaurantConverter;

  @Autowired
  private VotingService votingService;

  public Vote registerVote(UserDTO userDTO, RestaurantDTO restaurantDTO) {
    Voting currentVoting = votingService.getCurrentVoting();
    Restaurant restaurantToVote = restaurantConverter.convertToEntity(restaurantDTO);
    User voter = userConverter.convertToEntity(userDTO);

    if (currentVoting.getClosed()) {
      throw new InvalidVoteException("Voting session is closed for today");
    }

    if (restaurantToVote.getWinnerBlock()) {
      throw new InvalidVoteException("This restaurant is not available for votes untill the end of this week");
    }

    Optional<Vote> existingVote = currentVoting.getVotes().stream()
        .filter(vote -> vote.getUser().getEmail().equals(voter.getEmail()))
        .findFirst();

    if (existingVote.isPresent()) {
      Vote vote = existingVote.get();

      if (vote.getRestaurant().equals(restaurantToVote)) {
        throw new DuplicateVoteException("User has already voted for this restaurant");
      }

      vote.setRestaurant(restaurantToVote);
      return voteRepository.save(vote);
    } else {

      Vote newVote = new Vote(
          voter,
          restaurantToVote,
          currentVoting);
      return voteRepository.save(newVote);
    }
  }
}
