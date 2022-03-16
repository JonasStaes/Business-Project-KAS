package com.ap.kas.repositories;

import java.util.Optional;

import com.ap.kas.models.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByNameAndEmail(String name, String email);
}
