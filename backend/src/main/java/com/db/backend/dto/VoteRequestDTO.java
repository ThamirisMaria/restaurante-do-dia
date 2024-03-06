package com.db.backend.dto;

import jakarta.validation.constraints.NotNull;

public record VoteRequestDTO(@NotNull UserDTO userDTO, @NotNull RestaurantDTO restaurantDTO) {
}
