package com.db.backend.validation;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;


public class FullNameValidatorTest {
    @Test
    public void test1() {
       var result = new FullNameValidator (). isValid("julia", null);

        assertEquals (false, result);
    }

    @Test
    public void test2() {
       var result = new FullNameValidator (). isValid("julia lima", null);

        assertEquals (true, result);

    }

    @Test
    public void test3() {
       var result = new FullNameValidator (). isValid("julia p", null);

        assertEquals (false, result);


    }
}
