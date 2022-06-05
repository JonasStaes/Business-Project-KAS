package com.ap.kas.repositories;

import com.ap.kas.models.FeedbackDocument;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * This interface is used to perform CRUD operations for the Employee class on the database.
 */
@Repository
public interface FeedbackDocumentRepository extends JpaRepository<FeedbackDocument, String> {
    
}
