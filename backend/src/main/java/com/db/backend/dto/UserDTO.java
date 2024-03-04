package com.db.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserDTO(
    @NotBlank(message = "Name is mandatory") String name,
    @NotBlank(message = "Email is mandatory") @Email(message = "User must provide a valid e-mail") String email) {
}
