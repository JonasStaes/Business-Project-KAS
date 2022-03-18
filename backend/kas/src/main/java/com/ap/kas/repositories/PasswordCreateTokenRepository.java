package com.ap.kas.repositories;

import java.util.Date;
import java.util.Optional;

import com.ap.kas.models.PasswordCreateToken;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordCreateTokenRepository extends JpaRepository<PasswordCreateToken, String>{
    void deleteByExpiryDateLessThan(Date now);
    void deleteAllByExpiryDateLessThan(Date now);

    void deleteByToken(String token);

    Optional<PasswordCreateToken> findByToken(String token);
}
