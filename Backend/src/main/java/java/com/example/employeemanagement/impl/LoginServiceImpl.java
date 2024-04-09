package com.example.employeemanagement.impl;

import com.example.employeemanagement.collections.Administrator;
import com.example.employeemanagement.collections.Employee;
import com.example.employeemanagement.repository.AdministratorRepository;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.example.employeemanagement.request.LoginRequest;
import com.example.employeemanagement.request.enums.UserType;
import com.example.employeemanagement.response.AdministratorProfileResponse;
import com.example.employeemanagement.service.AdministratorService;
import com.example.employeemanagement.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private AdministratorRepository administratorRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AdministratorService administratorService;

    @Override
    public AdministratorProfileResponse authenticate(LoginRequest loginRequest) throws Exception {
            Optional<Administrator> foundUser = administratorRepository.findByUserName(loginRequest.getUserName());
            if (!foundUser.isPresent()) {
                throw new Exception();
            } else if (!loginRequest.getPassword().equalsIgnoreCase(foundUser.get().getPassword())) {
                throw new Exception();
            }

        return administratorService.findByUsername(loginRequest.getUserName());
    }


}
