package com.db.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("restaurant")
@Tag(name = "Restaurant")
public class RestaurantController {
    @GetMapping()
    public String listRestaurant() {
        return "List of restaurants";
    }
}
