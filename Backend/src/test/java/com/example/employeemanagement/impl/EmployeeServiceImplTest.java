package com.example.employeemanagement.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.client.ExpectedCount.times;

import java.util.*;

import com.example.employeemanagement.request.UpdateUserProjectRequest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.employeemanagement.collections.Employee;
import com.example.employeemanagement.collections.EmployeeProjects;
import com.example.employeemanagement.collections.Projects;
import com.example.employeemanagement.expection.ProjectNotFound;
import com.example.employeemanagement.expection.UserDoesNotExist;
import com.example.employeemanagement.repository.EmployeeProjectsRepository;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.example.employeemanagement.repository.ProjectsRepository;
import com.example.employeemanagement.request.AddEmployeeReviewRequest;
import com.example.employeemanagement.response.EmployeeProfileResponse;
import org.springframework.util.CollectionUtils;

class EmployeeServiceImplTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private EmployeeProjectsRepository employeeProjectsRepository;

    @Mock
    private ProjectsRepository projectsRepository;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    private Employee employee1;
    private Employee employee2;
    private Projects project1;
    private Projects project2;
    private EmployeeProjects employeeProjects1;
    private EmployeeProjects employeeProjects2;
    private EmployeeProjects employeeProjects3;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);

        employee1 = new Employee();
        employee1.setId(1);
        employee1.setUserName("johndoe");
        employee1.setFirstName("John");
        employee1.setLastName("Doe");
        employee1.setSkills("Java:Spring:Hibernate");
        employee1.setSkillDomain("BACKEND");
        employee1.setLocation("New York");
        employee1.setActive(true);

        employee2 = new Employee();
        employee2.setId(2);
        employee2.setUserName("janedoe");
        employee2.setFirstName("Jane");
        employee2.setLastName("Doe");
        employee2.setSkills("Python:Flask:Django");
        employee2.setSkillDomain("FRONTEND");
        employee2.setLocation("San Francisco");
        employee2.setActive(true);

        project1 = new Projects();
        project1.setId(1);
        project1.setName("Project 1");
        project1.setDescription("Project 1 description");
        project1.setActive(true);

        project2 = new Projects();
        project2.setId(2);
        project2.setName("Project 2");
        project2.setDescription("Project 2 description");
        project2.setActive(true);

        employeeProjects1 = new EmployeeProjects();
        employeeProjects1.setId(1);
        employeeProjects1.setEmployee(employee1);
        employeeProjects1.setProject(project1);
        employeeProjects1.setActive(true);

        employeeProjects2 = new EmployeeProjects();
        employeeProjects2.setId(2);
        employeeProjects2.setEmployee(employee1);
        employeeProjects2.setProject(project2);
        employeeProjects2.setCompleted(true);
        employeeProjects2.setRating(4.5);
        employeeProjects2.setReview("Great work!");

        employeeProjects3 = new EmployeeProjects();
        employeeProjects3.setId(3);
        employeeProjects3.setEmployee(employee2);
        employeeProjects3.setProject(project2);
        employeeProjects3.setActive(true);
    }

    @Test
    void testFindByUsername() throws UserDoesNotExist {
        when(employeeRepository.findById(1)).thenReturn(Optional.of(employee1));
        EmployeeProfileResponse employeeProfileResponse = employeeService.findByUsername(1);

        assertEquals(employee1.getId(), employeeProfileResponse.getEmployeeId());
    }

    @Test
    void testFindByUsername_withInvalidId() throws UserDoesNotExist {
        when(employeeRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(UserDoesNotExist.class, () -> {
            employeeService.findByUsername(1);
        });
    }

    @Test
    void testFindByUsername_withProjects() throws UserDoesNotExist {
        when(employeeRepository.findById(1)).thenReturn(Optional.of(employee1));
        when(employeeProjectsRepository.findByEmployee(employee1)).thenReturn(Arrays.asList(employeeProjects1,
                employeeProjects2));
        EmployeeProfileResponse employeeProfileResponse = employeeService.findByUsername(1);

        assertEquals(employee1.getId(), employeeProfileResponse.getEmployeeId());
    }

    @Test
    void testFindByUsername_withNoValidProjects() throws UserDoesNotExist {
        when(employeeRepository.findById(1)).thenReturn(Optional.of(employee1));
        when(employeeProjectsRepository.findByEmployee(employee1)).thenReturn(Collections.emptyList());
        EmployeeProfileResponse employeeProfileResponse = employeeService.findByUsername(1);

        assertEquals(employee1.getId(), employeeProfileResponse.getEmployeeId());
    }

    @Test
    void testFindAllUsers() {
        when(employeeRepository.findAll()).thenReturn(Arrays.asList(employee1, employee2));
        List<EmployeeProfileResponse> employeeProfileResponseList = employeeService.findAllUsers();

        assertEquals(2, employeeProfileResponseList.size());
        assertEquals(employee1.getFirstName(), employeeProfileResponseList.get(0).getFirstName());
    }

    @Test
    void testFindAllUsers_emptyList() {
        when(employeeRepository.findAll()).thenReturn(Collections.emptyList());
        List<EmployeeProfileResponse> employeeProfileResponseList = employeeService.findAllUsers();

        assertEquals(0, employeeProfileResponseList.size());
    }

    @Test
    void testFindUserWithSkillDomainAndLocation() {
        String skillDomain = "FRONTEND";
        String location = "San Francisco";
        when(employeeRepository.findBySkillDomainAndLocation(skillDomain, location))
                .thenReturn(Collections.singletonList(employee2));

        List<EmployeeProfileResponse> employeeProfileResponseList = employeeService.findUsers(skillDomain,location);
        assertEquals(1, employeeProfileResponseList.size());
        assertEquals(employee2.getFirstName(), employeeProfileResponseList.get(0).getFirstName());
    }

    @Test
    void testFindUserWithSkillDomain() {
        String skillDomain = "FRONTEND";
        when(employeeRepository.findBySkillDomain(skillDomain))
                .thenReturn(Collections.singletonList(employee2));

        List<EmployeeProfileResponse> employeeProfileResponseList = employeeService.findUsers(skillDomain,null);
        assertEquals(1, employeeProfileResponseList.size());
        assertEquals(employee2.getFirstName(), employeeProfileResponseList.get(0).getFirstName());
    }

    @Test
    void testFindUserWithLocation() {
        String location = "San Francisco";
        when(employeeRepository.findByLocation(location))
                .thenReturn(Collections.singletonList(employee2));

        List<EmployeeProfileResponse> employeeProfileResponseList = employeeService.findUsers(null,location);
        assertEquals(1, employeeProfileResponseList.size());
        assertEquals(employee2.getFirstName(), employeeProfileResponseList.get(0).getFirstName());
    }

    @Test
    void testFindUserWithNoSkillDomainAndNoLocation() {
        when(employeeRepository.findAll())
                .thenReturn(Arrays.asList(employee1,employee2));

        List<EmployeeProfileResponse> employeeProfileResponseList = employeeService.findUsers(null,null);
        assertEquals(2, employeeProfileResponseList.size());
        assertEquals(employee1.getFirstName(), employeeProfileResponseList.get(0).getFirstName());
    }

    @Test
    public void testAddReviewWhenUserDoesNotExist() throws UserDoesNotExist, ProjectNotFound {
        // Given
        AddEmployeeReviewRequest request = new AddEmployeeReviewRequest();
        request.setEmployeeId(1);
        request.setRating(4);
        request.setReview("Good work!");

        // When
        when(employeeRepository.findById(request.getEmployeeId())).thenReturn(Optional.empty());


        assertThrows(UserDoesNotExist.class, () -> {
            employeeService.addReview(request);
        });
    }

    @Test
    public void testAddReviewSuccess() throws UserDoesNotExist, ProjectNotFound {
        // Given
        AddEmployeeReviewRequest request = new AddEmployeeReviewRequest();
        request.setEmployeeId(1);
        request.setRating(4);
        request.setReview("Good work!");
        Employee employee = new Employee();
        employee.setId(1);
        EmployeeProjects employeeProjects = new EmployeeProjects();
        employeeProjects.setEmployee(employee);

        // When
        when(employeeRepository.findById(request.getEmployeeId())).thenReturn(Optional.of(employee));
        when(employeeProjectsRepository.findByEmployeeAndIsActiveTrue(employee)).thenReturn(java.util.Collections.singletonList(employeeProjects));
        when(employeeProjectsRepository.save(any(EmployeeProjects.class))).thenReturn(employeeProjects);
        boolean result = employeeService.addReview(request);

        // Then
        assertEquals(true, result);
        assertEquals(request.getRating(), employeeProjects.getRating());
        assertEquals(request.getReview(), employeeProjects.getReview());
    }

    @Test
    void givenInvalidUserId_whenUpdateUserProject_thenThrowUserDoesNotExistException() {
        UpdateUserProjectRequest updateUserProjectRequest = new UpdateUserProjectRequest();
        updateUserProjectRequest.setEmployeeId(1);
        updateUserProjectRequest.setProjectId(1);
        updateUserProjectRequest.setMode("delete");

        when(employeeRepository.findById(any(Integer.class))).thenReturn(Optional.empty());

        assertThrows(UserDoesNotExist.class,
                () -> employeeService.updateUserProject(updateUserProjectRequest));
    }

    @Test
    void givenInvalidProjectId_whenUpdateUserProject_thenThrowProjectNotFoundException() {
        UpdateUserProjectRequest updateUserProjectRequest = new UpdateUserProjectRequest();
        updateUserProjectRequest.setEmployeeId(1);
        updateUserProjectRequest.setProjectId(1);
        updateUserProjectRequest.setMode("delete");

        when(employeeRepository.findById(any(Integer.class))).thenReturn(Optional.of(new Employee()));
        when(projectsRepository.findById(any(Integer.class))).thenReturn(Optional.empty());

        Assertions.assertThrows(ProjectNotFound.class,
                () -> employeeService.updateUserProject(updateUserProjectRequest));

    }

    @Test
    void givenValidDataAndAddMode_whenUpdateUserProject_thenSaveEmployeeProject() throws ProjectNotFound, UserDoesNotExist {
        UpdateUserProjectRequest updateUserProjectRequest = new UpdateUserProjectRequest();
        updateUserProjectRequest.setEmployeeId(1);
        updateUserProjectRequest.setProjectId(1);
        updateUserProjectRequest.setMode("add");

        Employee employee = new Employee();
        employee.setUserName("userName");
        Projects projects = new Projects();
        projects.setId(1);
        projects.setForecast(1);

        when(employeeRepository.findById(any(Integer.class))).thenReturn(Optional.of(employee));
        when(projectsRepository.findById(any(Integer.class))).thenReturn(Optional.of(projects));
        when(employeeProjectsRepository.findByEmployee(any(Employee.class))).thenReturn(new ArrayList<>());

        employeeService.updateUserProject(updateUserProjectRequest);
    }
}
