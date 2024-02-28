package com.db.backend.dto;

public record AddressDTO(String number, String postCode, String neighborhood, String street, String city,
    String state) {
}
