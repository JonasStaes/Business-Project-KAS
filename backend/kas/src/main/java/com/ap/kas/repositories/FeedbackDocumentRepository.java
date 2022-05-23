package com.ap.kas.repositories;

import com.ap.kas.models.FeedbackDocument;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackDocumentRepository extends JpaRepository<FeedbackDocument, String> {
    
}
