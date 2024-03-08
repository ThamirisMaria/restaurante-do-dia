package com.db.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.db.backend.dto.RestaurantDTO;
import com.db.backend.service.RestaurantService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("restaurant")
@Tag(name = "Restaurant")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;

    @PostMapping()
    public ResponseEntity<RestaurantDTO> registerRestaurant(@RequestBody @Valid RestaurantDTO restaurantDTO) {
        RestaurantDTO savedRestaurantDTO = restaurantService.registerRestaurant(restaurantDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRestaurantDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestaurantDTO> getRestaurantById(@PathVariable Long id) {
        RestaurantDTO restaurantDTO = restaurantService.getRestaurantById(id);
        return ResponseEntity.ok(restaurantDTO);
    }

    @GetMapping()
    public ResponseEntity<Page<RestaurantDTO>> getRestaurantsByBlocked(
            @RequestParam(value = "blocked", required = false) Boolean blocked,
            Pageable pageable) {
        if (blocked == null) {
            Page<RestaurantDTO> restaurantDTOs = restaurantService.getAllRestaurants(pageable);
            return ResponseEntity.ok(restaurantDTOs);
        }

        Page<RestaurantDTO> restaurantDTOs = restaurantService.getRestaurantsByWinnerBlockSortedByVotes(blocked,
                pageable);
        return ResponseEntity.ok(restaurantDTOs);
    }
}
