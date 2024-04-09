package com.example.employeemanagement.repository;

import com.example.employeemanagement.collections.Client;
import com.example.employeemanagement.collections.Employee;
import com.example.employeemanagement.collections.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectsRepository extends JpaRepository<Projects, Integer> {

    List<Projects> findByTeamLeader(Employee employee);

    List<Projects> findByClient(Client client);
}
