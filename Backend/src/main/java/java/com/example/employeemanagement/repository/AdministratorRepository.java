package com.example.employeemanagement.repository;

import com.example.employeemanagement.collections.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Integer> {
    Optional<Administrator> findByUserName(String userName);
}
