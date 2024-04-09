package com.example.employeemanagement.service;

import com.example.employeemanagement.expection.ClientDoesNotExist;
import com.example.employeemanagement.expection.ProjectNotFound;
import com.example.employeemanagement.expection.UserDoesNotExist;
import com.example.employeemanagement.request.AddProjectRequest;
import com.example.employeemanagement.response.EmployeeProfileResponse;
import com.example.employeemanagement.response.ProjectResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProjectService {

    List<ProjectResponse> findAllProjects();

    List<ProjectResponse> findClientProjects(String clientName) throws ClientDoesNotExist;

    ProjectResponse findProjectDetails(Integer projectId) throws ProjectNotFound;

    ProjectResponse addNewProject(AddProjectRequest addProjectRequest) throws UserDoesNotExist, ClientDoesNotExist;
}
