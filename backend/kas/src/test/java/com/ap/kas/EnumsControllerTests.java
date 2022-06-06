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

import com.github.javafaker.Faker;
import com.github.javafaker.service.FakeValuesService;
import com.github.javafaker.service.RandomService;



@ActiveProfiles(profiles = Profiles.TEST)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class EnumsControllerTests {

    private static final String CONTROLLER_MAPPING = "/enums";
    private static final Logger logger = LoggerFactory.getLogger(EnumsControllerTests.class);

    
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ModelMapper modelMapper;
 
    private WhiteListEntry whiteListEntry;
    private BlackListEntry blackListEntry;
    private Customer testCustomer;
    private CreditRequest creditRequest;

    @Autowired
    private WhiteListRepository whiteListRepository;

    @Autowired
    private BlackListRepository blackListRepository;

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
        
        
        
    }

    @Test
    public void readAllStatusesTest() {

        List<Status> expectedList = Arrays.asList(Status.values());
        final ResponseEntity<MessageResponse> forEntity = restTemplate.getForEntity(CONTROLLER_MAPPING + "/statuses" , MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        List<Status> actualList = new LinkedList<Status>();
        ((List<Object>)forEntity.getBody().getData()).forEach(o -> {
            actualList.add(modelMapper.map(o, Status.class));
        });

        assertIterableEquals(expectedList, actualList);
    }

    @Test
    public void readAllInvestmentTypesTest(){


        List<InvestmentTypeReadDto> expectedList = Stream.of(InvestmentType.values())
                .map(investmentType -> investmentTypeMapper.convertToReadDto(investmentType))
                .collect(Collectors.toList());

        
        final ResponseEntity<MessageResponse> forEntity = restTemplate.getForEntity(CONTROLLER_MAPPING + "/investmentTypes" , MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        List<InvestmentTypeReadDto> actualList = new LinkedList<InvestmentTypeReadDto>();
        ((List<Object>)forEntity.getBody().getData()).forEach(o -> {
            actualList.add(modelMapper.map(o, InvestmentTypeReadDto.class));
            });

        assertIterableEquals(expectedList, actualList);

    }
}