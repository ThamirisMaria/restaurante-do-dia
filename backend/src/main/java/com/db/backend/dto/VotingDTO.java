package com.db.backend.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;

public record VotingDTO(@NotNull Boolean closed,
    List<VoteDTO> votes,
    RestaurantDTO winningRestaurantDTO) {
}
