package com.db.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RestaurantDTO(
                @NotBlank(message = "Name is mandatory") String name,
                @NotBlank(message = "Description is mandatory") String description,
                String website,
                String image,
                @NotNull(message = "Address is mandatory") AddressDTO address,
                Boolean blocked) {
}
