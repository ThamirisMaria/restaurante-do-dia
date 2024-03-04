package com.db.backend.dto;

import java.util.List;

import com.db.backend.entity.Vote;

import jakarta.validation.constraints.NotNull;

public record VotingDTO(@NotNull Boolean closed, List<Vote> votes, RestaurantDTO winningRestaurantDTO) {
}
