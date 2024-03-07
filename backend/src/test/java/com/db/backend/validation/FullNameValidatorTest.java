package com.db.backend.validation;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;


public class FullNameValidatorTest {
    @Test
    public void fullNameValidator_should_not_accept_single_name() {
       var result = new FullNameValidator().isValid("julia", null);

        assertEquals (false, result);
    }

    @Test
    public void fullNameValidator_should_accept_two_word_names() {
       var result = new FullNameValidator().isValid("julia lima", null);

        assertEquals (true, result);
    }

    @Test
    public void fullNameValidator_should_not_accept_one_letter_names() {
       var result = new FullNameValidator().isValid("julia p", null);

        assertEquals (false, result);
    }
}
