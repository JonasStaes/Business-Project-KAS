package com.ap.kas.repositories;

import java.util.Optional;

import com.ap.kas.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/**
 * This interface is used to perform CRUD operations for the User class on the database.
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByNameAndEmail(String name, String email);
}
