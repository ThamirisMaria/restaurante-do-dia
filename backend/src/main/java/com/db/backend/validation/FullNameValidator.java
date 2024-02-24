package com.db.backend.validation;

import com.db.backend.validation.constraints.FullName;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FullNameValidator implements ConstraintValidator<FullName, String>{

  @Override
  public void initialize(FullName constraintAnnotation) {
  }

  @Override
  public boolean isValid(String fullName, ConstraintValidatorContext context) {
      if (fullName == null || fullName.trim().isEmpty()) {
          return false;
      }

      String[] names = fullName.trim().split("\\s+");
      if (names.length < 2) {
          return false;
      }

      for (String name : names) {
          if (name.length() < 2) {
              return false;
          }
      }

      return true;
  }

}
