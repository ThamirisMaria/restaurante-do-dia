package com.db.backend.dto;

import com.db.backend.validation.constraints.FullName;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRegistrationRequestDTO(
    @NotBlank(message = "Name is mandatory") @FullName String name,
    @NotBlank(message = "Email is mandatory") @Email(message = "User must provide a valid e-mail") String email,
    @Size(min = 8, max = 12, message = "Password must be between 8 and 12 characters") String password) {
}
