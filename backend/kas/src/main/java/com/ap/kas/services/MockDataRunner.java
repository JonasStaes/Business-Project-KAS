package com.ap.kas.services;

import java.time.Period;
import java.util.LinkedList;
import java.util.List;

import com.ap.kas.config.Profiles;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.repositories.CreditRequestRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile(Profiles.DEMO)
public class MockDataRunner implements CommandLineRunner {
    
    private static final Logger logger = LoggerFactory.getLogger(MockDataRunner.class);

    @Autowired
    private CreditRequestRepository creditRequestRepository;

    @Override
    public void run(String... args) throws Exception {
        creditRequestRepository.deleteAll();

        List<CreditRequest> creditRequests = new LinkedList<CreditRequest>() {{
            for (int i = 0; i < 20; i++) {
                add(createRandomCreditRequest(i + 1));
            }
        }};

        creditRequestRepository.saveAll(creditRequests);

        creditRequestRepository.findAll().forEach(cr -> logger.info("{}", cr));
    }

    private CreditRequest createRandomCreditRequest(int i) {
        return new CreditRequest("test " + i, (float)Math.floor(100 + Math.random() * (20000 - 100)), (float)Math.floor(100 + Math.random() * (20000 - 100)), Period.ofMonths(Math.toIntExact((long)Math.floor(1 + Math.random() * (24 - 1)))), "this is a test accountability for test credit request " + i);
    }
    
}
