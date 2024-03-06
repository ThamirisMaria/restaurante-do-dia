package com.db.backend.converter;

public interface EntityDTOConverter<T, D> {
  D convertToDTO(T entity);

  T convertToEntity(D dto);
}
