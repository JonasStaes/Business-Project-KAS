package com.ap.kas;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.Duration;

import com.ap.kas.dtos.createdtos.CreditRequestCreateDto;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CreditRequestRepository;
import com.ap.kas.services.mappers.CreditRequestMapper;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class CreditRequestControllerTests {
    
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private CreditRequestRepository creditRequestRepository;

    @Autowired
    private CreditRequestMapper creditRequestMapper;

    private static CreditRequest creditRequest;

    @BeforeAll
    public static void init() {
        //initialize test data
        creditRequest = new CreditRequest();
        creditRequest.setName("Test Request");
        creditRequest.setRequestedAmount(100.0f);
        creditRequest.setTotalAmount(200.0f);
        creditRequest.setDuration(Duration.ofDays(60));
        creditRequest.setAccountability("Test Accountability");
    }


    @Test
    public void createNewCreditRequestTest() {
        //create dto for test
        CreditRequestCreateDto dto = new CreditRequestCreateDto();
        dto.setName(creditRequest.getName());
        dto.setRequestedAmount(creditRequest.getRequestedAmount());
        dto.setTotalAmount(creditRequest.getTotalAmount());
        dto.setDuration(creditRequest.getDuration());
        dto.setAccountability(creditRequest.getAccountability());

        //get actual result from mock API call
        final ResponseEntity<MessageResponse> forEntity = restTemplate.postForEntity("/credit_request/", dto, MessageResponse.class);

        //assert that status code is ok, meaning the request was successful
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        //assert that all PASSED fields are the same, aka all fields in the dto.
        CreditRequest actualCreditRequest = creditRequestRepository.findByName(creditRequest.getName()).get();
        assertEquals(creditRequest.getName(), actualCreditRequest.getName());
        assertEquals(creditRequest.getRequestedAmount(), actualCreditRequest.getRequestedAmount());
        assertEquals(creditRequest.getTotalAmount(), actualCreditRequest.getTotalAmount());
        assertEquals(creditRequest.getDuration(), actualCreditRequest.getDuration());
        assertEquals(creditRequest.getAccountability(), actualCreditRequest.getAccountability());
    }
}
