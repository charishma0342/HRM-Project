package com.example.employeemanagement.impl;

import com.example.employeemanagement.collections.Administrator;
import com.example.employeemanagement.expection.UserDoesNotExist;
import com.example.employeemanagement.repository.AdministratorRepository;
import com.example.employeemanagement.response.AdministratorProfileResponse;
import com.example.employeemanagement.service.AdministratorService;
import com.github.dozermapper.core.DozerBeanMapperBuilder;
import com.github.dozermapper.core.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
public class AdministratorServiceImpl implements AdministratorService {

    @Autowired
    private AdministratorRepository administratorRepository;

    Mapper mapper = DozerBeanMapperBuilder.buildDefault();

    @Override
    public AdministratorProfileResponse findByUsername(String userName) throws UserDoesNotExist {
        Optional<Administrator> foundUser = administratorRepository.findByUserName(userName);
        if (!foundUser.isPresent()) {
            throw new UserDoesNotExist("Given username does not exist.");
        }
        return convertAdministratorProfileResponse(foundUser.get());
    }

    private AdministratorProfileResponse convertAdministratorProfileResponse(
            Administrator administrator) {
        AdministratorProfileResponse administratorProfileResponse =
                mapper.map(administrator, AdministratorProfileResponse.class);
        administratorProfileResponse.setAcquiredSkills(Arrays.asList(administrator.getSkills().split(":")));
        return administratorProfileResponse;
    }
}
