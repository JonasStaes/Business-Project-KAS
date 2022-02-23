package com.ap.kas.repositories;

import java.util.Optional;

import com.ap.kas.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findById(String id);
    Optional<User> findByName(String name);
}

    
