package com.db.backend.dto;

import jakarta.validation.constraints.NotNull;

public record VoteDTO(@NotNull UserDTO userDTO, @NotNull RestaurantDTO restaurantDTO) {
}
