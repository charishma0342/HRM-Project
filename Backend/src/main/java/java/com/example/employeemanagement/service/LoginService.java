package com.example.employeemanagement.service;

import com.example.employeemanagement.request.LoginRequest;
import com.example.employeemanagement.response.AdministratorProfileResponse;
import org.springframework.stereotype.Service;

@Service
public interface LoginService {

    AdministratorProfileResponse authenticate(LoginRequest loginRequest) throws Exception;
}
