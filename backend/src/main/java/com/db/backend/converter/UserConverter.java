package com.db.backend.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Component;

import com.db.backend.dto.UserDTO;
import com.db.backend.entity.User;
import com.db.backend.repository.UserRepository;

import jakarta.validation.constraints.NotNull;

@Component
public class UserConverter implements EntityDTOConverter<User, UserDTO> {

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDTO convertToDTO(User user) {
    return new UserDTO(user.getName(), user.getEmail());
  }

  @Override
  public User convertToEntity(@NotNull UserDTO userDTO) {
    User user = userRepository.findUserByEmail(userDTO.email());
    if (user == null) {
      throw new ResourceNotFoundException("User with email " + userDTO.email() + " not found");
    }
    return user;
  }

}
