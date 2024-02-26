package com.db.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.db.backend.dto.UserAuthenticationRequestDTO;
import com.db.backend.dto.UserRegistrationRequestDTO;
import com.db.backend.dto.UserRegistrationResponseDTO;
import com.db.backend.entity.User;
import com.db.backend.infra.security.JwtService;
import com.db.backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
@Tag(name = "Authentication")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Operation(summary = "Login user", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User successfully authenticated"),
            @ApiResponse(responseCode = "401", description = "Authentication failed due to invalid credentials")
    })
    @PostMapping("/login")
    public ResponseEntity<UserRegistrationResponseDTO> login(@RequestBody @Valid UserAuthenticationRequestDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = this.jwtService.generate((User) auth.getPrincipal());
        return ResponseEntity.ok(new UserRegistrationResponseDTO(token));
    }

    @Operation(summary = "Register user", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User created successfully"),
            @ApiResponse(responseCode = "400", description = "Registration failed due to invalid credentials"),
            @ApiResponse(responseCode = "409", description = "E-mail already in use")
    })
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserRegistrationRequestDTO data) {
        if (this.userService.existsByEmail(data.email())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail already in use");
        }
        this.userService.registerNewUser(data);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return errors;
    }
}
