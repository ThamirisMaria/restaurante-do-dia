package com.db.backend.dto;

import io.micrometer.common.lang.NonNull;

public record AddressDTO(@NonNull String number, @NonNull String postCode, @NonNull String neighborhood,
        @NonNull String street, @NonNull String city,
        @NonNull String state) {
}
