package com.ap.kas;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.lang.reflect.Field;
import java.time.Period;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.ap.kas.config.Profiles;
import com.ap.kas.dtos.readdtos.CreditRequestReadDto;
import com.ap.kas.dtos.readdtos.InvestmentTypeReadDto;
import com.ap.kas.models.BlackListEntry;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.models.Customer;
import com.ap.kas.models.InvestmentType;
import com.ap.kas.models.Status;
import com.ap.kas.models.WhiteListEntry;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.BlackListRepository;
import com.ap.kas.repositories.CreditRequestRepository;
import com.ap.kas.repositories.CustomerRepository;
import com.ap.kas.repositories.FileStorageRepository;
import com.ap.kas.repositories.WhiteListRepository;
import com.ap.kas.services.KruispuntDBApiService;
import com.ap.kas.services.mappers.CreditRequestMapper;
import com.ap.kas.services.mappers.InvestmentTypeMapper;
import com.ap.kas.services.mappers.UserMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties.Admin;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.BodyInserters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static  org.hamcrest.MatcherAssert.assertThat; 

import com.github.javafaker.Faker;
import com.github.javafaker.service.FakeValuesService;
import com.github.javafaker.service.RandomService;

@ActiveProfiles(profiles = Profiles.TEST)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class RatingAgentControllerTests {

    private static final String CONTROLLER_MAPPING = "/rating_agent";
    private static final Logger logger = LoggerFactory.getLogger(RatingAgentControllerTests.class);

    
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ModelMapper modelMapper;
 
    private Customer testCustomer;
    private CreditRequest creditRequest;

 

    @Autowired
    private CreditRequestRepository creditRequestRepository;

    @Autowired
    private CreditRequestMapper creditRequestMapper;

    @Autowired
    private FileStorageRepository fileStorageRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private KruispuntDBApiService apiService;

    @Autowired
    private InvestmentTypeMapper investmentTypeMapper;

    


    Faker faker = new Faker(new Locale("nl-BE"));
    FakeValuesService fakeValuesService = new FakeValuesService(new Locale("nl-BE"), new RandomService());

    @BeforeEach
    public void init() {
        
        testCustomer = new Customer("testCustomer", "testCustomer@gmail.com", true, passwordEncoder.encode(new StringBuffer("testCustomer")), "1234567890");
        customerRepository.save(testCustomer);

        creditRequest = new CreditRequest("Test Request", 200.0f, 100.0f, Period.ofMonths(2), InvestmentType.ONROERENDE_GOEDEREN, testCustomer);
        creditRequestRepository.save(creditRequest);
    }

    @Test
    public void readAllCreditRequestsTest() {

        List<CreditRequestReadDto> expectedList = new LinkedList<CreditRequestReadDto>();
            creditRequestRepository.findAll().stream()
                .filter(cr -> {
                    return !cr.isSuspicious();
                })
                .forEach(cr -> {
                    CreditRequestReadDto readDto = creditRequestMapper.convertToReadDto(cr);
                    readDto.setFiles(fileStorageRepository.findAllByCreditRequest(cr));
                    expectedList.add(readDto);
                });


        final ResponseEntity<MessageResponse> forEntity = restTemplate.getForEntity(CONTROLLER_MAPPING + "/all" , MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        List<CreditRequestReadDto> actualList = new LinkedList<CreditRequestReadDto>();
        ((List<Object>)forEntity.getBody().getData()).forEach(o -> {
            actualList.add(modelMapper.map(o, CreditRequestReadDto.class));
        });

        assertIterableEquals(expectedList, actualList);
    }
}