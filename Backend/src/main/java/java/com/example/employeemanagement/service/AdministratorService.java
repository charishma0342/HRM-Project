package com.example.employeemanagement.service;

import com.example.employeemanagement.expection.UserDoesNotExist;
import com.example.employeemanagement.response.AdministratorProfileResponse;
import org.springframework.stereotype.Service;

@Service
public interface AdministratorService {
    AdministratorProfileResponse findByUsername(String userName) throws UserDoesNotExist;
}
