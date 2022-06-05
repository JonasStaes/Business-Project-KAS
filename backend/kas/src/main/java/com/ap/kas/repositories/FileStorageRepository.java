package com.ap.kas.repositories;

import java.util.List;

import com.ap.kas.models.CreditRequest;
import com.ap.kas.models.FileStorage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/**
 * This interface is used to perform CRUD operations for the FileStorage object on the database.
 */
@Repository
public interface FileStorageRepository extends JpaRepository<FileStorage, String> {
    List<FileStorage> findAllByCreditRequest(CreditRequest creditRequest);
}
