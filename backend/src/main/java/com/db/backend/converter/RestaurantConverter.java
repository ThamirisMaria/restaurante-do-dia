package com.db.backend.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Restaurant;
import com.db.backend.repository.RestaurantRepository;

@Component
public class RestaurantConverter implements EntityDTOConverter<Restaurant, RestaurantDTO> {

  private final AddressConverter addressConverter;
  private final RestaurantRepository restaurantRepository;

  @Autowired
  public RestaurantConverter(AddressConverter addressConverter, RestaurantRepository restaurantRepository) {
    this.addressConverter = addressConverter;
    this.restaurantRepository = restaurantRepository;
  }

  @Override
  public RestaurantDTO convertToDTO(Restaurant restaurant) {
    return new RestaurantDTO(
        restaurant.getName(),
        restaurant.getDescription(),
        restaurant.getWebsite(),
        restaurant.getImage(),
        addressConverter.convertToDTO(restaurant.getAddress()));
  }

  @Override
  public Restaurant convertToEntity(RestaurantDTO restaurantDTO) {
    Restaurant existingRestaurant = restaurantRepository.findByAddressNumberAndAddressPostCode(
        restaurantDTO.address().number(),
        restaurantDTO.address().postCode());

    if (existingRestaurant != null) {
      return existingRestaurant;
    }

    return new Restaurant(
        restaurantDTO.name(),
        restaurantDTO.description(),
        restaurantDTO.website(),
        restaurantDTO.image(),
        addressConverter.convertToEntity(restaurantDTO.address()));
  }
}
