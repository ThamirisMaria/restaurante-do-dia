package com.db.backend.service;


import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
//import org.junit.Assert;
//import org.junit.runner.RunWith;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
//import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.InjectMocks;
//import org.mockito.runners.MockitoJUnitRunner;
import  org.junit.jupiter.api.extension.ExtendWith;
import  org.mockito.junit.jupiter.MockitoExtension;
import com.db.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;



@ExtendWith (MockitoExtension.class)
public class UserServiceTest {
    @InjectMocks
    private UserService service;
    @Mock
    private UserRepository repository;
    @Mock
    private UserDetails userDetails;



    @Test
    public void test1() {
        when(repository.findByEmail("julia@gmail.com"))
            .thenReturn(userDetails);

     var result = service.existsByEmail ("julia@gmail.com");   
        assertEquals(true, result);

    }

    @Test
    public void test2() {

     var result = service.existsByEmail ("julia@gmail.com");   
        assertEquals(false, result);

    }
}  