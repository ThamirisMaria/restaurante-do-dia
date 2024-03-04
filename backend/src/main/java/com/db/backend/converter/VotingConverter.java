package com.db.backend.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.db.backend.dto.VotingDTO;
import com.db.backend.entity.Voting;

@Component
public class VotingConverter implements EntityDTOConverter<Voting, VotingDTO> {
  @Autowired
  private RestaurantConverter restaurantConverter;

  @Override
  public VotingDTO convertToDTO(Voting voting) {
    return new VotingDTO(
        voting.getClosed(),
        voting.getVotes(),
        restaurantConverter.convertToDTO(voting.getWinningRestaurant()));
  }

  @Override
  public Voting convertToEntity(VotingDTO votingDTO) {
    return new Voting();
  }
}
