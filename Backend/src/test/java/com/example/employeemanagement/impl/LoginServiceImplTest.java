package com.example.employeemanagement.impl;

import com.example.employeemanagement.collections.Administrator;
import com.example.employeemanagement.collections.Employee;
import com.example.employeemanagement.repository.AdministratorRepository;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.example.employeemanagement.request.LoginRequest;
import com.example.employeemanagement.request.enums.UserType;
import com.example.employeemanagement.response.AdministratorProfileResponse;
import com.example.employeemanagement.service.AdministratorService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LoginServiceImplTest {

    @Mock
    private AdministratorRepository administratorRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private AdministratorService administratorService;

    @InjectMocks
    private LoginServiceImpl loginService;

    private final AdministratorProfileResponse expectedResponse = new AdministratorProfileResponse();

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        expectedResponse.setFirstName("usha");
    }

    @Test
    void testAuthenticateWithValidAdminCredentials() throws Exception {
        String userName = "admin";
        String password = "admin";
        LoginRequest loginRequest = new LoginRequest(userName, password);

        Administrator administrator = new Administrator();
        administrator.setFirstName("usha");
        administrator.setUserName(userName);
        administrator.setPassword(password);

        Mockito.when(administratorRepository.findByUserName(userName)).thenReturn(Optional.of(administrator));
        Mockito.when(administratorService.findByUsername(userName)).thenReturn(expectedResponse);
        AdministratorProfileResponse administratorProfileResponse = loginService.authenticate(loginRequest);

        Assertions.assertEquals(administrator.getFirstName(),administratorProfileResponse.getFirstName());
    }

    @Test
    void testAuthenticateWithInvalidAdminCredentials() {
        String userName = "admin";
        String password = "password";
        LoginRequest loginRequest = new LoginRequest(userName, password);

        Administrator administrator = new Administrator();
        administrator.setUserName(userName);
        administrator.setPassword("uhihuiyh");

        Mockito.when(administratorRepository.findByUserName(userName)).thenReturn(Optional.of(administrator));

        Assertions.assertThrows(Exception.class, () -> {
            loginService.authenticate(loginRequest);
        });
    }

    @Test
    void testAuthenticateWithValidEmployeeCredentials() throws Exception {
        String userName = "employee";
        String password = "employee";
        LoginRequest loginRequest = new LoginRequest(userName, password);

        Administrator administrator = new Administrator();
        administrator.setFirstName("usha");
        administrator.setUserName(userName);
        administrator.setPassword(password);

        Mockito.when(administratorRepository.findByUserName(userName)).thenReturn(Optional.of(administrator));
        Mockito.when(administratorService.findByUsername(userName)).thenReturn(expectedResponse);

        AdministratorProfileResponse administratorProfileResponse = loginService.authenticate(loginRequest);

        assertEquals(administrator.getFirstName(), administratorProfileResponse.getFirstName());
    }

    @Test
    void testAuthenticateWithInvalidEmployeeCredentials() {
        String userName = "employee";
        String password = "password";
        LoginRequest loginRequest = new LoginRequest(userName, password);

        Employee employee = new Employee();
        employee.setUserName(userName);
        employee.setPassword("ygtyug");

        Mockito.when(employeeRepository.findByUserName(userName)).thenReturn(Optional.of(employee));

        Assertions.assertThrows(Exception.class, () -> {
            loginService.authenticate(loginRequest);
        });
    }
}
