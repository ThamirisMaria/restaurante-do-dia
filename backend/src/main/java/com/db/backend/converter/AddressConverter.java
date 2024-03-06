package com.db.backend.converter;

import org.springframework.stereotype.Component;

import com.db.backend.dto.AddressDTO;
import com.db.backend.entity.Address;

@Component
public class AddressConverter implements EntityDTOConverter<Address, AddressDTO> {

  @Override
  public AddressDTO convertToDTO(Address address) {
    return new AddressDTO(
        address.getNumber(),
        address.getPostCode(),
        address.getNeighborhood(),
        address.getStreet(),
        address.getCity(),
        address.getState());
  }

  @Override
  public Address convertToEntity(AddressDTO addressDTO) {
    return new Address(
        addressDTO.number(),
        addressDTO.postCode(),
        addressDTO.neighborhood(),
        addressDTO.street(),
        addressDTO.city(),
        addressDTO.state());
  }
}
