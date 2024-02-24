package com.db.backend.dto;

import jakarta.validation.constraints.Size;

public record UserRegistrationRequestDTO(
    String name,
    String email,
    @Size(min = 8, max = 12, message = "Password must be between 8 and 12 characters") String password) {
}
