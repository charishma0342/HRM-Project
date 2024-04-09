package com.example.employeemanagement.impl;

import com.example.employeemanagement.collections.Employee;
import com.example.employeemanagement.collections.EmployeeProjects;
import com.example.employeemanagement.collections.Projects;
import com.example.employeemanagement.expection.ProjectNotFound;
import com.example.employeemanagement.expection.UserDoesNotExist;
import com.example.employeemanagement.repository.EmployeeProjectsRepository;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.example.employeemanagement.repository.ProjectsRepository;
import com.example.employeemanagement.request.AddEmployeeReviewRequest;
import com.example.employeemanagement.request.UpdateUserProjectRequest;
import com.example.employeemanagement.response.EmployeeProfileResponse;
import com.example.employeemanagement.response.EmployeeProjectResponse;
import com.example.employeemanagement.service.EmployeeService;
import com.github.dozermapper.core.DozerBeanMapperBuilder;
import com.github.dozermapper.core.Mapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private EmployeeProjectsRepository employeeProjectsRepository;
    @Autowired
    private ProjectsRepository projectsRepository;

    Mapper mapper = DozerBeanMapperBuilder.buildDefault();

    @Override
    public EmployeeProfileResponse findByUsername(Integer userName) throws UserDoesNotExist {
        Optional<Employee> foundUser = employeeRepository.findById(userName);
        if (!foundUser.isPresent()) {
            throw new UserDoesNotExist("Given username does not exist.");
        }
        List<EmployeeProjects> employeeProjects = employeeProjectsRepository.findByEmployee(foundUser.get());
        EmployeeProfileResponse employeeProfileResponse = convertEmployeeProfileResponse(
                foundUser.get());
        setEmployeeProjects(employeeProfileResponse, employeeProjects);
        return employeeProfileResponse;
    }

    @Override
    public List<EmployeeProfileResponse> findAllUsers() {
        List<Employee> employeesList = employeeRepository.findAll();
        return employeesList
                .stream()
                .filter(Objects::nonNull)
                .filter(Employee::isActive)
                .map(this::convertEmployeeProfileResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<EmployeeProfileResponse> findUsers(String skillDomain, String location) {
        List<Employee> employeesList = new ArrayList<>();
        if (StringUtils.isNotEmpty(skillDomain) && StringUtils.isNotEmpty(location)) {
            employeesList = employeeRepository.findBySkillDomainAndLocation(skillDomain, location);
        } else if (StringUtils.isEmpty(skillDomain) && StringUtils.isNotEmpty(location)) {
            employeesList = employeeRepository.findByLocation(location);
        } else if (StringUtils.isNotEmpty(skillDomain) && StringUtils.isEmpty(location)) {
            employeesList = employeeRepository.findBySkillDomain(skillDomain);
        } else {
            employeesList = employeeRepository.findAll();
        }
        return employeesList
                .stream()
                .filter(Objects::nonNull)
                .filter(Employee::isActive)
                .map(this::convertEmployeeProfileResponse)
                .collect(Collectors.toList());
    }

    @Override
    public boolean addReview(AddEmployeeReviewRequest addEmployeeReviewRequest) throws UserDoesNotExist,
            ProjectNotFound {
        Optional<Employee> foundUser = employeeRepository.findById(addEmployeeReviewRequest.getEmployeeId());
        if (!foundUser.isPresent()) {
            throw new UserDoesNotExist("Given employee Id does not exist.");
        }
        List<EmployeeProjects> employeeProjectsList =
                employeeProjectsRepository.findByEmployeeAndIsActiveTrue(foundUser.get());
        if (!CollectionUtils.isEmpty(employeeProjectsList)) {
            EmployeeProjects employeeProjects = employeeProjectsList.get(0);
            if (Objects.nonNull(employeeProjects)) {
                employeeProjects.setRating(addEmployeeReviewRequest.getRating());
                employeeProjects.setReview(addEmployeeReviewRequest.getReview());
                employeeProjectsRepository.save(employeeProjects);
                return true;
            }
        }
        return false;
    }

    @Override
    public void updateUserProject(UpdateUserProjectRequest updateUserProjectRequest) throws ProjectNotFound,
            UserDoesNotExist {
        Optional<Employee> employeeOptional = employeeRepository.findById(updateUserProjectRequest.getEmployeeId());
        Optional<Projects> projectsOptional = projectsRepository.findById(updateUserProjectRequest.getProjectId());
        if (!employeeOptional.isPresent()) {
            throw new UserDoesNotExist("Given user id does not exist.");
        }
        if (!projectsOptional.isPresent()) {
            throw new ProjectNotFound("Given project id does not exist.");
        }
        if ("add".equalsIgnoreCase(updateUserProjectRequest.getMode())) {
            List<EmployeeProjects> activeEmployeeProjects =
                    employeeProjectsRepository.findByEmployee(employeeOptional.get());
            activeEmployeeProjects.stream().filter(Objects::nonNull)
                    .filter(EmployeeProjects::isActive)
                    .forEach(this::updateProjectStatus);
            EmployeeProjects employeeProjects = new EmployeeProjects();
            employeeProjects.setProject(projectsOptional.get());
            employeeProjects.setEmployee(employeeOptional.get());
            employeeProjects.setActive(true);
            employeeProjects.setStartDate(new Date(System.currentTimeMillis()));
            employeeProjects.setCompleted(false);
            employeeProjectsRepository.save(employeeProjects);
            Projects projects = projectsOptional.get();
            projects.setForecast(projects.getForecast() - 1);
            projectsRepository.save(projects);
        } else if ("delete".equalsIgnoreCase(updateUserProjectRequest.getMode())) {
            EmployeeProjects employeeProjects =
                    employeeProjectsRepository.findByEmployeeAndProject(employeeOptional.get(), projectsOptional.get());
            employeeProjects.setCompleted(true);
            employeeProjects.setActive(false);
            employeeProjects.setEndDate(new Date(System.currentTimeMillis()));
            employeeProjectsRepository.save(employeeProjects);
        }
    }

    private void updateProjectStatus(EmployeeProjects activeEmployeeProjects){
        activeEmployeeProjects.setCompleted(true);
        activeEmployeeProjects.setActive(false);
        activeEmployeeProjects.setEndDate(new Date(System.currentTimeMillis()));
        employeeProjectsRepository.save(activeEmployeeProjects);
    }

    private EmployeeProfileResponse convertEmployeeProfileResponse(
            Employee employee) {
        List<EmployeeProjects> employeeProjectsList = employeeProjectsRepository.findByEmployee(employee);
        int count = 0;
        double total = 0.0;
        for (EmployeeProjects employeeProject : employeeProjectsList) {
            if (employeeProject.isActive() || employeeProject.isCompleted()) {
                count++;
                double rating = employeeProject.getRating() == null ? 0.0 : employeeProject.getRating();
                total += rating;
            }
        }

        List<EmployeeProjects> activeProjects = employeeProjectsList.stream()
                .filter(Objects::nonNull)
                .filter(EmployeeProjects::isActive)
                .collect(Collectors.toList());
        EmployeeProfileResponse employeeProfileResponse = mapper.map(employee, EmployeeProfileResponse.class);
        employeeProfileResponse.setEmployeeId(employee.getId());
        if (count > 0) {
            employeeProfileResponse.setOverallRating(total / count);
        } else {
            employeeProfileResponse.setOverallRating(0);
        }
        if (!CollectionUtils.isEmpty(activeProjects)) {
            employeeProfileResponse.setCurrentProjectName(activeProjects.get(0).getProject().getName());
        }
        employeeProfileResponse.setAcquiredSkills(Arrays.asList(employee.getSkills().split(":")));
        return employeeProfileResponse;
    }

    private void setEmployeeProjects(
            EmployeeProfileResponse employeeProfileResponse,
            List<EmployeeProjects> employeeProjects) {
        List<EmployeeProjects> activeProjects;
        List<EmployeeProjects> pastProjects;
        List<EmployeeProjects> futureProjects;
        List<EmployeeProjectResponse> activeProjectsResponse;
        List<EmployeeProjectResponse> pastProjectsResponse;
        List<EmployeeProjectResponse> futureProjectsResponse;
        activeProjects = employeeProjects.stream()
                .filter(Objects::nonNull)
                .filter(EmployeeProjects::isActive)
                .collect(Collectors.toList());
        pastProjects = employeeProjects.stream()
                .filter(Objects::nonNull)
                .filter(EmployeeProjects::isCompleted)
                .collect(Collectors.toList());
        futureProjects = employeeProjects.stream()
                .filter(Objects::nonNull)
                .filter(employeeProjects1 -> (!employeeProjects1.isActive() && !employeeProjects1.isCompleted()))
                .collect(Collectors.toList());

        activeProjectsResponse = activeProjects.stream()
                .filter(Objects::nonNull)
                .map(this::convertEmployeeProjectResponse)
                .collect(Collectors.toList());
        pastProjectsResponse = pastProjects.stream()
                .filter(Objects::nonNull)
                .map(this::convertEmployeeProjectResponse)
                .collect(Collectors.toList());
        futureProjectsResponse = futureProjects.stream()
                .filter(Objects::nonNull)
                .map(this::convertEmployeeProjectResponse)
                .collect(Collectors.toList());
        employeeProfileResponse.setActiveProjects(activeProjectsResponse);
        employeeProfileResponse.setPastProjects(pastProjectsResponse);
        employeeProfileResponse.setFutureProjects(futureProjectsResponse);
    }

    private EmployeeProjectResponse convertEmployeeProjectResponse(EmployeeProjects employeeProjects) {
        EmployeeProjectResponse employeeProjectResponse = new EmployeeProjectResponse();
        employeeProjectResponse.setProjectId(employeeProjects.getProject().getId());
        employeeProjectResponse.setProjectDescription(employeeProjects.getProject().getDescription());
        employeeProjectResponse.setProjectName(employeeProjects.getProject().getName());
        employeeProjectResponse.setGoals(employeeProjects.getProject().getGoals());
        employeeProjectResponse.setStartDate(employeeProjects.getStartDate());
        employeeProjectResponse.setEndDate(employeeProjects.getEndDate());
        employeeProjectResponse.setReview(employeeProjects.getReview());
        employeeProjectResponse.setRating(employeeProjects.getRating());
        return employeeProjectResponse;
    }
}
