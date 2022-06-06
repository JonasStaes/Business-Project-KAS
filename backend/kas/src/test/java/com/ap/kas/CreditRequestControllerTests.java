package com.ap.kas;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.Mockito.when;

import java.time.Period;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import com.ap.kas.config.Profiles;
import com.ap.kas.dtos.createdtos.CreditRequestCreateDto;
import com.ap.kas.dtos.readdtos.CreditRequestReadDto;
import com.ap.kas.dtos.requestdtos.CustomerLoginRequestDto;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.models.Customer;
import com.ap.kas.models.InvestmentType;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CreditRequestRepository;
import com.ap.kas.repositories.CustomerRepository;
import com.ap.kas.repositories.FileStorageRepository;
import com.ap.kas.services.mappers.CreditRequestMapper;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
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

import lombok.var;

@ActiveProfiles(profiles = Profiles.TEST)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class CreditRequestControllerTests {

    private static final String CONTROLLER_MAPPING = "/credit_request";
    private static final Logger logger = LoggerFactory.getLogger(CreditRequestControllerTests.class);

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private WebTestClient webClient;

    @Autowired
    private CreditRequestRepository creditRequestRepository;

    @Autowired
    private CreditRequestMapper creditRequestMapper;

    @Autowired
    private FileStorageRepository fileStorageRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CustomerRepository customerRepository;

    private Customer testCustomer;

    private CreditRequest creditRequest;

    private String creditRequestId;


    Faker faker = new Faker(new Locale("nl-BE"));
    FakeValuesService fakeValuesService = new FakeValuesService(new Locale("nl-BE"), new RandomService());

    @BeforeEach
    public void init() {
        testCustomer = new Customer("testCustomer", "testCustomer@gmail.com", true, passwordEncoder.encode(new StringBuffer("testCustomer")), "1234567890");
        customerRepository.save(testCustomer);
        

        creditRequest = new CreditRequest("Test Request", 200.0f, 100.0f, Period.ofMonths(2), InvestmentType.ONROERENDE_GOEDEREN, testCustomer);
        creditRequestRepository.save(creditRequest);
        creditRequestId = creditRequestRepository.findByName("Test Request").orElse(null).getId();
    }

    @AfterEach
    public void cleanup() {
        customerRepository.delete(testCustomer);
        creditRequestRepository.delete(creditRequest);
    }

    @Test
    public void readAllCreditRequests() {

        final ResponseEntity<MessageResponse> forEntity = restTemplate.getForEntity(CONTROLLER_MAPPING + "/all" + "/" + testCustomer.getId() , MessageResponse.class);
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
    public void readOneCreditRequest() {

        final ResponseEntity<MessageResponse> forEntity = restTemplate.getForEntity(CONTROLLER_MAPPING + "/" + creditRequestId , MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        assertEquals(modelMapper.map(creditRequest, CreditRequestReadDto.class), modelMapper.map(forEntity.getBody().getData(), CreditRequestReadDto.class));

    }


    @Test
    public void createNewCreditRequest() {

        Customer customer = customerRepository.findByCompanyNr("1234567890").orElse(null);

        MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();

        bodyBuilder.part("parentId", customer.getId());
        bodyBuilder.part("name", creditRequest.getName());
        bodyBuilder.part("totalAmount", creditRequest.getTotalAmount());
        bodyBuilder.part("financedAmount", creditRequest.getFinancedAmount());
        bodyBuilder.part("duration", creditRequest.getDuration());
        bodyBuilder.part("investmentType", creditRequest.getInvestmentType().name());

        

        webClient.post().uri(CONTROLLER_MAPPING + "/")
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .accept(MediaType.MULTIPART_FORM_DATA)
            .body(BodyInserters.fromMultipartData(bodyBuilder.build()))
            .exchange()
            .expectBody();

        
        CreditRequest actualCreditRequest = creditRequestRepository.findByName(creditRequest.getName()).get();
        assertEquals(creditRequest.getName(), actualCreditRequest.getName());
        assertEquals(creditRequest.getTotalAmount(), actualCreditRequest.getTotalAmount());
        assertEquals(creditRequest.getFinancedAmount(), actualCreditRequest.getFinancedAmount());
        assertEquals(creditRequest.getDuration(), actualCreditRequest.getDuration());
    }
}
