package com.ap.kas.repositories;

import java.util.Optional;

import com.ap.kas.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public class UserRepository {

@Repository
public interface CreditRequestRepository extends JpaRepository<User, String> {
    Optional<User> findById(String id);
}

    
}
