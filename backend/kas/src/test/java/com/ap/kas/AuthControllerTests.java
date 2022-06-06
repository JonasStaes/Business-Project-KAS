package com.ap.kas;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Period;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import com.ap.kas.config.Profiles;
import com.ap.kas.models.BlackListEntry;
import com.ap.kas.models.Customer;
import com.ap.kas.models.WhiteListEntry;
import com.ap.kas.payload.response.JwtResponse;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.BlackListRepository;
import com.ap.kas.repositories.CustomerRepository;
import com.ap.kas.repositories.WhiteListRepository;
import com.ap.kas.services.mappers.CreditRequestMapper;
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
import org.springframework.web.reactive.function.client.WebClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.github.javafaker.Faker;
import com.github.javafaker.service.FakeValuesService;
import com.github.javafaker.service.RandomService;

@ActiveProfiles(profiles = Profiles.TEST)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class AuthControllerTests {

    private static final String CONTROLLER_MAPPING = "/signin";
    private static final Logger logger = LoggerFactory.getLogger(CreditRequestControllerTests.class);

    
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private WebTestClient webClient;

    @Autowired
    private ModelMapper modelMapper;
 
    private Customer testCustomer;

    @Autowired
    private WhiteListRepository whiteListRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private BlackListRepository blackListRepository;

    @Autowired CustomerRepository customerRepository;


    Faker faker = new Faker(new Locale("nl-BE"));
    FakeValuesService fakeValuesService = new FakeValuesService(new Locale("nl-BE"), new RandomService());

    @BeforeEach
    public void init() {
        
        testCustomer = new Customer("testCustomer", "testCustomer@gmail.com", true, encoder.encode(new StringBuffer("testCustomer")), "1234567890");
        customerRepository.save(testCustomer);
        
    }

    @Test
    public void customerSigninTest(){
        
       
        //Because only one entry with the same nacebel can exist at the same time, we will just test if an entry with the given expected nacebel code exists.

        MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();

        

        bodyBuilder.part("companyNr", testCustomer.getCompanyNr());
        bodyBuilder.part("password" , "testCustomer");

        

       JwtResponse response = webClient.post().uri(CONTROLLER_MAPPING + "/customer")
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .accept(MediaType.MULTIPART_FORM_DATA)
            .body(BodyInserters.fromMultipartData(bodyBuilder.build()))
            .exchange()
            .expectBody(JwtResponse.class)
            .returnResult()
            .getResponseBody();

        
        String expectedId = customerRepository.findByCompanyNr(testCustomer.getCompanyNr()).get().getId();

        

        assertEquals(expectedId, response.getId());
    }
}
