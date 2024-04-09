package com.example.employeemanagement.impl;

import com.example.employeemanagement.collections.Administrator;
import com.example.employeemanagement.expection.UserDoesNotExist;
import com.example.employeemanagement.repository.AdministratorRepository;
import com.example.employeemanagement.response.AdministratorProfileResponse;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class AdministratorServiceImplTest {

    @Mock
    private AdministratorRepository administratorRepository;

    @InjectMocks
    private AdministratorServiceImpl administratorService;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test(expected = UserDoesNotExist.class)
    public void testFindByUsernameWhenUserDoesNotExist() throws UserDoesNotExist {
        when(administratorRepository.findByUserName(anyString())).thenReturn(Optional.empty());
        administratorService.findByUsername("non-existent-username");
    }

    @Test
    public void testFindByUsernameWhenUserExists() throws UserDoesNotExist {
        Administrator administrator = new Administrator();
        administrator.setUserName("test-username");
        administrator.setSkills("skill1:skill2:skill3");
        administrator.setFirstName("sasank");

        when(administratorRepository.findByUserName("test-username")).thenReturn(Optional.of(administrator));

        AdministratorProfileResponse administratorProfileResponse = administratorService.findByUsername("test-username");

        assertNotNull(administratorProfileResponse);
        assertEquals(administrator.getFirstName(), administratorProfileResponse.getFirstName());
        assertEquals(administrator.getSkills(), String.join(":", administratorProfileResponse.getAcquiredSkills()));
    }
}
