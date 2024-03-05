package com.db.backend.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.db.backend.dto.VoteRequestDTO;
import com.db.backend.entity.Vote;

@Component
public class VoteConverter implements EntityDTOConverter<Vote, VoteRequestDTO> {

  @Autowired
  private UserConverter userConverter;
  @Autowired
  private RestaurantConverter restaurantConverter;

  @Override
  public VoteRequestDTO convertToDTO(Vote vote) {
    return new VoteRequestDTO(userConverter.convertToDTO(vote.getUser()),
        restaurantConverter.convertToDTO(vote.getRestaurant()));
  }

  @Override
  public Vote convertToEntity(VoteRequestDTO dto) {
    throw new UnsupportedOperationException("Unimplemented method 'convertToEntity'");
  }
}
