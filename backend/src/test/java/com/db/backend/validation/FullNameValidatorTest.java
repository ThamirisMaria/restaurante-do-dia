package com.db.backend.validation;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
//import org.junit.Assert;
//import org.junit.runner.RunWith;
import static org.junit.jupiter.api.Assertions.assertEquals;
//import org.mockito.Mockito.mock;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.runners.MockitoJUnitRunner;


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
