package com.example.employeemanagement.service;

import com.example.employeemanagement.expection.ProjectNotFound;
import com.example.employeemanagement.expection.UserDoesNotExist;
import com.example.employeemanagement.request.AddEmployeeReviewRequest;
import com.example.employeemanagement.request.UpdateUserProjectRequest;
import com.example.employeemanagement.response.EmployeeProfileResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmployeeService {
    EmployeeProfileResponse findByUsername(Integer userName) throws UserDoesNotExist;

    List<EmployeeProfileResponse> findAllUsers();

    List<EmployeeProfileResponse> findUsers(String skillDomain, String location);

    boolean addReview(AddEmployeeReviewRequest addEmployeeReviewRequest) throws UserDoesNotExist, ProjectNotFound;

    void updateUserProject(UpdateUserProjectRequest updateUserProjectRequest) throws ProjectNotFound, UserDoesNotExist;
}
