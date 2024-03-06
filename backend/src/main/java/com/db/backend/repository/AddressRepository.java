package com.db.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.db.backend.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
