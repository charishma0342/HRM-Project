package com.example.employeemanagement.repository;

import com.example.employeemanagement.collections.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Optional<Employee> findByUserName(String userName);

    List<Employee> findBySkillDomainAndLocation(String skillDomain, String location);

    List<Employee> findBySkillDomain(String skillDomain);

    List<Employee> findByLocation(String location);
}
