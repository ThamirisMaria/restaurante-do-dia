package com.db.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.db.backend.entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
  Restaurant findByAddressNumberAndAddressPostCode(String number, String postalCode);

  List<Restaurant> findByWinnerBlockIsTrue();

  Page<Restaurant> findByWinnerBlockIsTrue(Pageable pageable);

  Page<Restaurant> findByWinnerBlockIsFalse(Pageable pageable);
}
