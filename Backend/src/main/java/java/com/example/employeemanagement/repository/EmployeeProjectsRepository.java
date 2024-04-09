package com.example.employeemanagement.repository;

import com.example.employeemanagement.collections.Employee;
import com.example.employeemanagement.collections.EmployeeProjects;
import com.example.employeemanagement.collections.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeProjectsRepository extends JpaRepository<EmployeeProjects, Integer> {

    List<EmployeeProjects> findByEmployee(Employee employee);

    List<EmployeeProjects> findByEmployeeAndIsActiveTrue(Employee employee);

    EmployeeProjects findByEmployeeAndProject(Employee employee, Projects projects);

    List<EmployeeProjects> findByProject(Projects project);
}
