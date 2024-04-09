package com.example.employeemanagement.impl;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

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

@RunWith(MockitoJUnitRunner.class)
public class ProjectServiceImplTest {

    @InjectMocks
    private ProjectServiceImpl projectService;

    @Mock
    private ProjectsRepository projectsRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private EmployeeProjectsRepository employeeProjectsRepository;

    @Mock
    private ClientRepository clientRepository;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testFindAllProjects() {

        Client client = new Client();
        client.setId(1);
        client.setName("Client 1");

        Employee employee1 = new Employee();
        employee1 = new Employee();
        employee1.setId(1);
        employee1.setUserName("johndoe");
        employee1.setFirstName("John");
        employee1.setLastName("Doe");
        employee1.setSkills("Java:Spring:Hibernate");
        employee1.setSkillDomain("BACKEND");
        employee1.setLocation("New York");
        employee1.setActive(true);

        Projects project1 = new Projects();
        project1.setId(1);
        project1.setName("Project 1");
        project1.setClient(client);
        project1.setRequiredSkills("Java:Spring:Hibernate");
        project1.setTeamLeader(employee1);


        Projects project2 = new Projects();
        project2.setId(2);
        project2.setName("Project 2");
        project2.setClient(client);
        project2.setRequiredSkills("Java:Spring:Hibernate");
        project2.setTeamLeader(employee1);

        List<Projects> projects = new ArrayList<>(Arrays.asList(project1, project2));

        when(projectsRepository.findAll()).thenReturn(projects);

        // act
        List<ProjectResponse> projectResponses = projectService.findAllProjects();

        // assert
        assertNotNull(projectResponses);
        assertEquals(2, projectResponses.size());
        assertEquals("Project 1", projectResponses.get(0).getProjectName());
        assertEquals("Project 2", projectResponses.get(1).getProjectName());
    }

    @Test
    public void testFindClientProjects() throws ClientDoesNotExist {
        // arrange
        Client client = new Client();
        client.setId(1);
        client.setName("Client 1");

        Employee employee1 = new Employee();
        employee1 = new Employee();
        employee1.setId(1);
        employee1.setUserName("johndoe");
        employee1.setFirstName("John");
        employee1.setLastName("Doe");
        employee1.setSkills("Java:Spring:Hibernate");
        employee1.setSkillDomain("BACKEND");
        employee1.setLocation("New York");
        employee1.setActive(true);

        Projects project1 = new Projects();
        project1.setId(1);
        project1.setName("Project 1");
        project1.setClient(client);
        project1.setRequiredSkills("Java:Spring:Hibernate");
        project1.setTeamLeader(employee1);

        Projects project2 = new Projects();
        project2.setId(2);
        project2.setName("Project 2");
        project2.setClient(client);
        project2.setRequiredSkills("Java:Spring:Hibernate");
        project2.setTeamLeader(employee1);



        List<Projects> projects = new ArrayList<>(Arrays.asList(project1, project2));

        when(clientRepository.findByName("Client 1")).thenReturn(client);
        when(projectsRepository.findByClient(client)).thenReturn(projects);

        // act
        List<ProjectResponse> projectResponses = projectService.findClientProjects("Client 1");

        // assert
        assertNotNull(projectResponses);
        assertEquals(2, projectResponses.size());
        assertEquals("Project 1", projectResponses.get(0).getProjectName());
    }
}
