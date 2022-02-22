package com.ap.kas.repositories;

import java.util.Optional;

import com.ap.kas.models.CreditRequest;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface CreditRequestRepository extends JpaRepository<CreditRequest, String> {
    //findBy{propertyname} auto generates a method that find an entry in the repository by this prop
    Optional<CreditRequest> findByName(String name);
}
