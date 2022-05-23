package com.ap.kas.repositories;

import java.util.Date;
import java.util.Optional;

import com.ap.kas.models.UserUpdateToken;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserUpdateTokenRepository extends JpaRepository<UserUpdateToken, String>{
    void deleteByExpiryDateLessThan(Date now);
    void deleteAllByExpiryDateLessThan(Date now);

    void deleteByToken(String token);

    Optional<UserUpdateToken> findByToken(String token);
}
