package com.ap.kas.repositories;

import java.util.Optional;

import com.ap.kas.models.Employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * This interface is used to perform CRUD operations for the Employee class on the database.
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {
    Optional<Employee> findByEmail(String email);
}
