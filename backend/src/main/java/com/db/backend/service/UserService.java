package com.db.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.db.backend.dto.UserRegistrationRequestDTO;
import com.db.backend.entity.User;
import com.db.backend.repository.UserRepository;

@Service
public class UserService {

  @Autowired  //vai buscar do framework e injetar aqui
  private UserRepository repository;

  public boolean existsByEmail(String email) {
    return this.repository.findByEmail(email) != null;
  }

  public void registerNewUser(UserRegistrationRequestDTO data) {
    String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
    User newUser = new User(data.name(), data.email(), encryptedPassword);
    this.repository.save(newUser);
  }
}
