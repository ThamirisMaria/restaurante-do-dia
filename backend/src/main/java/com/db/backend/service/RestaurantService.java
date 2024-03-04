package com.db.backend.service;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.db.backend.converter.AddressConverter;
import com.db.backend.converter.RestaurantConverter;
import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Address;
import com.db.backend.entity.Restaurant;
import com.db.backend.repository.AddressRepository;
import com.db.backend.repository.RestaurantRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RestaurantService {

  @Autowired
  private RestaurantRepository restaurantRepository;
  @Autowired
  private RestaurantConverter restaurantConverter;

  @Autowired
  private AddressRepository addressRepository;
  @Autowired
  private AddressConverter addressConverter;

  public RestaurantDTO registerNewRestaurant(RestaurantDTO restaurantDTO) {
    Address address = addressConverter.convertToEntity(restaurantDTO.address());

    Address savedAddress = addressRepository.save(address);

    Restaurant restaurant = restaurantConverter.convertToEntity(restaurantDTO);
    restaurant.setAddress(savedAddress);

    savedAddress.setRestaurant(restaurant);

    Restaurant savedRestaurant = restaurantRepository.save(restaurant);
    return restaurantConverter.convertToDTO(savedRestaurant);
  }

  public Page<RestaurantDTO> getAllRestaurants(Pageable pageable) {
    Sort sort = Sort.by(Sort.Direction.ASC, "name");

    pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
    Page<Restaurant> restaurantsPage = restaurantRepository.findAll(pageable);

    return restaurantsPage.map(restaurantConverter::convertToDTO);
  }

  public Page<RestaurantDTO> getRestaurantsByWinnerBlockSortedByVotes(Boolean winnerBlock, Pageable pageable) {
    Page<Restaurant> restaurantsPage = restaurantRepository.findByWinnerBlockSortedByVotes(winnerBlock, pageable);
    return restaurantsPage.map(restaurantConverter::convertToDTO);
  }

  public RestaurantDTO getRestaurantById(Long id) {
    Restaurant restaurant = restaurantRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));
    return restaurantConverter.convertToDTO(restaurant);
  }

  public boolean hasRestaurantWonInCurrentWeek(Long restaurantId) {
    Restaurant restaurant = restaurantRepository.findById(restaurantId)
        .orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));

    int currentWeek = LocalDate.now().get(WeekFields.ISO.weekOfWeekBasedYear());
    return restaurant.getWinWeek() != null && restaurant.getWinWeek() == currentWeek;
  }

  public void updateWinnerBlockForCurrentWeek() {
    int currentWeek = LocalDate.now().get(WeekFields.ISO.weekOfWeekBasedYear());
    List<Restaurant> restaurants = restaurantRepository.findByWinnerBlockIsTrue();
    for (Restaurant restaurant : restaurants) {
      if (restaurant.getWinWeek() != null && restaurant.getWinWeek() != currentWeek) {
        restaurant.setWinnerBlock(false);
        restaurantRepository.save(restaurant);
      }
    }
  }
}
