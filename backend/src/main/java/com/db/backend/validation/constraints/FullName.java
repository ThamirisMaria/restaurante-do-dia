package com.db.backend.validation.constraints;

import java.lang.annotation.*;

import com.db.backend.validation.FullNameValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = FullNameValidator.class)
@Documented
public @interface FullName {
  String message() default "User must have a name and a last name";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
