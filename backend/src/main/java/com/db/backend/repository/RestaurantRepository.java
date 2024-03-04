package com.db.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.db.backend.entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
  @Query(value = "SELECT r.* " +
      "FROM restaurants r " +
      "LEFT JOIN votes v ON r.id = v.restaurant_id " +
      "WHERE r.winnerBlock = :winnerBlock " +
      "GROUP BY r.id " +
      "ORDER BY COUNT(v.id) DESC NULLS LAST", nativeQuery = true)
  Page<Restaurant> findByWinnerBlockSortedByVotes(
      @Param("winnerBlock") Boolean winnerBlock, Pageable pageable);

  Restaurant findByAddressNumberAndAddressPostCode(String number, String postalCode);

  List<Restaurant> findByWinnerBlockIsTrue();
}
