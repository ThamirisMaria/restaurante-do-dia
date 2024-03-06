package com.db.backend.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.db.backend.dto.VoteDTO;
import com.db.backend.dto.VotingDTO;
import com.db.backend.entity.Vote;
import com.db.backend.entity.Voting;

@Component
public class VotingConverter implements EntityDTOConverter<Voting, VotingDTO> {
  @Autowired
  private RestaurantConverter restaurantConverter;
  @Autowired
  private UserConverter userConverter;

  @Override
  public VotingDTO convertToDTO(Voting voting) {
    return new VotingDTO(
        voting.getClosed(),
        convertListToDTO(voting.getVotes()),
        restaurantConverter.convertToDTO(voting.getWinningRestaurant()));
  }

  @Override
  public Voting convertToEntity(VotingDTO votingDTO) {
    return new Voting();
  }

  public List<VoteDTO> convertListToDTO(List<Vote> votes) {
    List<VoteDTO> votesDTOs = new ArrayList<>();

    for (Vote vote : votes) {
      votesDTOs.add(new VoteDTO(userConverter.convertToDTO(vote.getUser()),
          restaurantConverter.convertToDTO(vote.getRestaurant())));
    }

    return votesDTOs;
  }
}
