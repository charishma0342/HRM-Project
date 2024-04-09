package com.example.employeemanagement.impl;

import com.example.employeemanagement.collections.Client;
import com.example.employeemanagement.collections.Employee;
import com.example.employeemanagement.collections.EmployeeProjects;
import com.example.employeemanagement.collections.Projects;
import com.example.employeemanagement.expection.ClientDoesNotExist;
import com.example.employeemanagement.expection.ProjectNotFound;
import com.example.employeemanagement.expection.UserDoesNotExist;
import com.example.employeemanagement.repository.ClientRepository;
import com.example.employeemanagement.repository.EmployeeProjectsRepository;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.example.employeemanagement.repository.ProjectsRepository;
import com.example.employeemanagement.request.AddProjectRequest;
import com.example.employeemanagement.response.EmployeeDetails;
import com.example.employeemanagement.response.ProjectResponse;
import com.example.employeemanagement.service.ProjectService;
import com.github.dozermapper.core.DozerBeanMapperBuilder;
import com.github.dozermapper.core.Mapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectsRepository projectsRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeProjectsRepository employeeProjectsRepository;

    @Autowired
    private ClientRepository clientRepository;

    Mapper mapper = DozerBeanMapperBuilder.buildDefault();

    @Override
    public List<ProjectResponse> findAllProjects() {
        List<Projects> projectsList = projectsRepository.findAll();
        return projectsList.stream()
                .filter(Objects::nonNull)
                .map(this::convertProject)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> findClientProjects(String clientName) throws ClientDoesNotExist {
        if (StringUtils.isEmpty(clientName)) {
            List<Projects> projectsList = projectsRepository.findAll();
            return projectsList.stream()
                    .filter(Objects::nonNull)
                    .map(this::convertProject)
                    .collect(Collectors.toList());
        }
        Client client = clientRepository.findByName(clientName);
        if (Objects.nonNull(client)) {
            List<Projects> projectsList = projectsRepository.findByClient(client);
            return projectsList.stream()
                    .filter(Objects::nonNull)
                    .map(this::convertProject)
                    .collect(Collectors.toList());
        } else {
            throw new ClientDoesNotExist("Given Client name does not exist.");
        }
    }

    @Override
    public ProjectResponse findProjectDetails(Integer projectId) throws ProjectNotFound {
        Optional<Projects> optionalProject = projectsRepository.findById(projectId);
        if (optionalProject.isPresent()) {
            return convertProject(optionalProject.get());
        }
        throw new ProjectNotFound("Given Project Id Does not exist");
    }

    @Override
    public ProjectResponse addNewProject(AddProjectRequest addProjectRequest) throws UserDoesNotExist,
            ClientDoesNotExist {
        if (Objects.nonNull(addProjectRequest)) {
            Client client = clientRepository.findByName(addProjectRequest.getClientName());
            if (Objects.nonNull(client)) {
                Optional<Employee> foundUser = employeeRepository.findById(addProjectRequest.getTeamLeaderId());
                if (foundUser.isPresent()) {
                    Employee teamLeader = foundUser.get();
                    Projects projects = new Projects();
                    projects.setName(addProjectRequest.getName());
                    projects.setDescription(addProjectRequest.getDescription());
                    projects.setGoals(addProjectRequest.getGoals());
                    projects.setRequiredSkills(addProjectRequest.getRequiredSkills());
                    projects.setTeamLeader(teamLeader);
                    projects.setStartDate(addProjectRequest.getStartDate());
                    projects.setEndDate(addProjectRequest.getEndDate());
                    projects.setActive(addProjectRequest.isActive());
                    projects.setCompleted(addProjectRequest.isCompleted());
                    projects.setForecast(addProjectRequest.getForecast());
                    projects.setClient(client);

                    Projects addedProject = projectsRepository.save(projects);

                    if (Objects.nonNull(addedProject.getId())) {
                        List<EmployeeProjects> activeEmployeeProjects =
                                employeeProjectsRepository.findByEmployeeAndIsActiveTrue(teamLeader);
                        activeEmployeeProjects.stream().filter(Objects::nonNull)
                                .filter(EmployeeProjects::isActive)
                                .forEach(this::updateProjectStatus);
                        EmployeeProjects employeeProjects = new EmployeeProjects();
                        employeeProjects.setProject(addedProject);
                        employeeProjects.setEmployee(teamLeader);
                        employeeProjects.setStartDate(addedProject.getStartDate());
                        employeeProjects.setActive(addedProject.isActive());
                        employeeProjects.setCompleted(addedProject.isCompleted());

                        employeeProjectsRepository.save(employeeProjects);
                        return convertProject(addedProject);
                    }
                } else {
                    throw new UserDoesNotExist("Given team leader ID does not exist.");
                }
            } else {
                throw new ClientDoesNotExist("Given Client name does not exist.");
            }
        }
        return null;
    }

    private void updateProjectStatus(EmployeeProjects activeEmployeeProjects){
        activeEmployeeProjects.setCompleted(true);
        activeEmployeeProjects.setActive(false);
        activeEmployeeProjects.setEndDate(new Date(System.currentTimeMillis()));
        employeeProjectsRepository.save(activeEmployeeProjects);
    }

    private ProjectResponse convertProject(Projects projects) {
        List<EmployeeProjects> projectEmployees = employeeProjectsRepository.findByProject(projects);
        List<Employee> employees = projectEmployees.stream().filter(Objects::nonNull)
                .filter(EmployeeProjects::isActive)
                .map(EmployeeProjects::getEmployee)
                .collect(Collectors.toList());
        List<EmployeeDetails> employeeDetails = employees.stream()
                .filter(Objects::nonNull)
                .map(this::convertEmployeeDetails)
                .collect(Collectors.toList());
        ProjectResponse projectResponse = convertProjectResponse(projects);
        projectResponse.setEmployees(employeeDetails);
        return projectResponse;
    }

    private ProjectResponse convertProjectResponse(Projects projects) {
        ProjectResponse projectResponse = new ProjectResponse();
        projectResponse.setProjectId(projects.getId());
        projectResponse.setProjectName(projects.getName());
        projectResponse.setProjectDescription(projects.getDescription());
        projectResponse.setGoals(projects.getGoals());
        projectResponse.setActive(projects.isActive());
        projectResponse.setCompleted(projects.isCompleted());
        projectResponse.setForecast(projects.getForecast());
        projectResponse.setStartDate(projects.getStartDate());
        projectResponse.setEndDate(projects.getEndDate());
        projectResponse.setTeamLeader(convertEmployeeDetails(projects.getTeamLeader()));
        projectResponse.setSkillsRequired(Arrays.asList(projects.getRequiredSkills().split(":")));
        projectResponse.setClientName(projects.getClient().getName());
        return projectResponse;
    }

    private EmployeeDetails convertEmployeeDetails(Employee employee) {
        return EmployeeDetails.builder()
                .employeeId(employee.getId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .emailId(employee.getEmailId())
                .skills(Arrays.asList(employee.getSkills().split(":")))
                .phoneNumber(employee.getPhoneNumber())
                .joiningDate(employee.getJoiningDate())
                .exitDate(employee.getExitDate())
                .isActive(employee.isActive())
                .build();
    }
}
