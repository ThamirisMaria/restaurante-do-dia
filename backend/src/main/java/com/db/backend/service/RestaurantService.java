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

  public List<RestaurantDTO> getAllRestaurants() {
    return restaurantRepository.findAll().stream()
        .map(this::mapToDTO)
        .collect(Collectors.toList());
  }

  public List<RestaurantDTO> getRestaurantsByWinnerBlock(boolean winnerBlock) {
    return restaurantRepository.findByWinnerBlock(winnerBlock).stream()
        .map(this::mapToDTO)
        .collect(Collectors.toList());
  }

  public RestaurantDTO getRestaurantById(Long id) {
    Restaurant restaurant = restaurantRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));
    return mapToDTO(restaurant);
  }

  private RestaurantDTO mapToDTO(Restaurant restaurant) {
    return new RestaurantDTO(
        restaurant.getName(),
        restaurant.getDescription(),
        restaurant.getWebsite(),
        restaurant.getImage(),
        mapAddressToDTO(restaurant.getAddress()));
  }

  private AddressDTO mapAddressToDTO(Address address) {
    return new AddressDTO(
        address.getNumber(),
        address.getPostCode(),
        address.getNeighborhood(),
        address.getStreet(),
        address.getCity(),
        address.getState());
  }
}
