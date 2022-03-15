package com.ap.kas.repositories;

import java.util.Optional;

import com.ap.kas.models.Employee;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
    Optional<Employee> findByEmail(String email);
}
