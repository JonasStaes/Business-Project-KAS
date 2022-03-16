package com.ap.kas.repositories;

import java.util.Date;

import com.ap.kas.models.PasswordCreateToken;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordCreateTokenRepository extends JpaRepository<PasswordCreateToken, String>{
    void deleteByExpiryDateLessThan(Date now);
}
