package com.db.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.db.backend.dto.AddressDTO;
import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Address;
import com.db.backend.entity.Restaurant;
import com.db.backend.repository.AddressRepository;
import com.db.backend.repository.RestaurantRepository;

@Service
public class RestaurantService {

  @Autowired
  private RestaurantRepository restaurantRepository;

  @Autowired
  private AddressRepository addressRepository;

  public Long registerNewRestaurant(RestaurantDTO restaurantDTO) {
    AddressDTO addressDTO = restaurantDTO.address();
    Address address = new Address(
        addressDTO.number(),
        addressDTO.postCode(),
        addressDTO.neighborhood(),
        addressDTO.street(),
        addressDTO.city(),
        addressDTO.state());

    Address savedAddress = addressRepository.save(address);

    Restaurant restaurant = new Restaurant(
        restaurantDTO.name(),
        restaurantDTO.description(),
        restaurantDTO.website(),
        restaurantDTO.image(),
        savedAddress);

    savedAddress.setRestaurant(restaurant);

    Restaurant savedRestaurant = restaurantRepository.save(restaurant);
    return savedRestaurant.getId();
  }

}
