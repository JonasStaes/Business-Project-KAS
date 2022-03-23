package com.ap.kas;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;

import java.time.Period;
import java.util.LinkedList;
import java.util.List;

import com.ap.kas.dtos.createdtos.CreditRequestCreateDto;
import com.ap.kas.dtos.readdtos.CreditRequestReadDto;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CreditRequestRepository;
import com.ap.kas.repositories.FileStorageRepository;
import com.ap.kas.services.mappers.CreditRequestMapper;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class CreditRequestControllerTests {

    private static final String CONTROLLER_MAPPING = "/credit_request";
    
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private CreditRequestRepository creditRequestRepository;

    @Autowired
    private CreditRequestMapper creditRequestMapper;

    @Autowired
    private FileStorageRepository fileStorageRepository;

    @Autowired
    private ModelMapper modelMapper;

    private static CreditRequest creditRequest;

    @BeforeAll
    public static void init() {
        //initialize test data
        creditRequest = new CreditRequest();
        creditRequest.setName("Test Request");
        creditRequest.setFinancedAmount(100.0f);
        creditRequest.setTotalAmount(200.0f);
        creditRequest.setDuration(Period.ofMonths(2));
        creditRequest.setAccountability("Test Accountability");
    }

    @Test
    public void readAllCapabilitiesTest() {
        final ResponseEntity<MessageResponse> forEntity = restTemplate.getForEntity(CONTROLLER_MAPPING + "/all", MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        List<CreditRequestReadDto> expectedList = new LinkedList<CreditRequestReadDto>();
        creditRequestRepository.findAll().forEach(cr -> {
            CreditRequestReadDto creditRequestReadDto = creditRequestMapper.convertToReadDto(cr);
            creditRequestReadDto.setFiles(fileStorageRepository.findAllByCreditRequest(cr));
            expectedList.add(creditRequestReadDto);
        });

        List<CreditRequestReadDto> actualList = new LinkedList<CreditRequestReadDto>();
        ((List<Object>)forEntity.getBody().getData()).forEach(o -> {
            actualList.add(modelMapper.map(o, CreditRequestReadDto.class));
        });
        assertIterableEquals(expectedList, actualList);
    }


    @Test
    public void createNewCreditRequestTest() {
        //create dto for test
        CreditRequestCreateDto dto = new CreditRequestCreateDto();
        dto.setName(creditRequest.getName());
        dto.setTotalAmount(creditRequest.getTotalAmount());
        dto.setFinancedAmount(creditRequest.getFinancedAmount());
        dto.setDuration(creditRequest.getDuration());
        dto.setAccountability(creditRequest.getAccountability());
        //dto.setFiles(fileStorageRepository.findAllByCreditRequest(creditRequest));

        //get actual result from mock API call
        final ResponseEntity<MessageResponse> forEntity = restTemplate.postForEntity(CONTROLLER_MAPPING + "/", dto, MessageResponse.class);

        //assert that status code is ok, meaning the request was successful
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        //assert that all PASSED fields are the same, aka all fields in the dto.
        //we can't test if the two objects are the same, even with hashcode and equals overrides
        //since the test data doesn't have an ID, and even if it did it's ID wouldn't match the DTO since they're separate entries in the repo
        CreditRequest actualCreditRequest = creditRequestRepository.findByName(creditRequest.getName()).get();
        assertEquals(creditRequest.getName(), actualCreditRequest.getName());
        assertEquals(creditRequest.getTotalAmount(), actualCreditRequest.getTotalAmount());
        assertEquals(creditRequest.getFinancedAmount(), actualCreditRequest.getFinancedAmount());
        assertEquals(creditRequest.getDuration(), actualCreditRequest.getDuration());
        assertEquals(creditRequest.getAccountability(), actualCreditRequest.getAccountability());
    }
}
