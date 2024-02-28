package com.db.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.db.backend.entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
  List<Restaurant> findByWinnerBlock(boolean winnerBlock);
}
