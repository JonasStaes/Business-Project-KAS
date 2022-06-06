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
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.BlackListRepository;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.github.javafaker.Faker;
import com.github.javafaker.service.FakeValuesService;
import com.github.javafaker.service.RandomService;

@ActiveProfiles(profiles = Profiles.TEST)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class CommercialDirectionControllerTests {

    private static final String CONTROLLER_MAPPING = "/commercial_direction";
    private static final Logger logger = LoggerFactory.getLogger(CreditRequestControllerTests.class);

    
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private WebTestClient webClient;

    @Autowired
    private ModelMapper modelMapper;
 
    private WhiteListEntry whiteListEntry;
    private BlackListEntry blackListEntry;

    @Autowired
    private WhiteListRepository whiteListRepository;

    @Autowired
    private BlackListRepository blackListRepository;


    Faker faker = new Faker(new Locale("nl-BE"));
    FakeValuesService fakeValuesService = new FakeValuesService(new Locale("nl-BE"), new RandomService());

    @BeforeEach
    public void init() {
        
        whiteListEntry = new WhiteListEntry();
        whiteListEntry.setNacebel("0123456");
        whiteListRepository.save(whiteListEntry);

        blackListEntry = new BlackListEntry();
        blackListEntry.setNacebel("0123457");
        blackListRepository.save(blackListEntry);
        
    }

    @Test
    public void getAllWhiteListTest() {

        final ResponseEntity<MessageResponse> forEntity = restTemplate.getForEntity(CONTROLLER_MAPPING + "/allwhitelist" , MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        List<WhiteListEntry> expectedList = new LinkedList<WhiteListEntry>();
        whiteListRepository.findAll().forEach(entry -> {
            expectedList.add(entry);
        });

        List<WhiteListEntry> actualList = new LinkedList<WhiteListEntry>();
        ((List<Object>)forEntity.getBody().getData()).forEach(o -> {
            actualList.add(modelMapper.map(o, WhiteListEntry.class));
        });
        assertIterableEquals(expectedList, actualList);
    }

    @Test
    public void getAllBlackListTest() {

        final ResponseEntity<MessageResponse> forEntity = restTemplate.getForEntity(CONTROLLER_MAPPING + "/allblacklist" , MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        List<BlackListEntry> expectedList = new LinkedList<BlackListEntry>();
        blackListRepository.findAll().forEach(entry -> {
            expectedList.add(entry);
        });

        List<BlackListEntry> actualList = new LinkedList<BlackListEntry>();
        ((List<Object>)forEntity.getBody().getData()).forEach(o -> {
            actualList.add(modelMapper.map(o, BlackListEntry.class));
        });
        assertIterableEquals(expectedList, actualList);
    }

    @Test
    public void whiteListDeleteTest() {

        assertNotNull(whiteListRepository.findByNacebel(whiteListEntry.getNacebel()));


        final ResponseEntity<MessageResponse> forEntity = restTemplate.exchange(CONTROLLER_MAPPING + "/whitelistdelete/" + whiteListEntry.getId(), HttpMethod.DELETE, null,  MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        
        assertNull(whiteListRepository.findByNacebel(whiteListEntry.getNacebel()));
    }

    @Test
    public void blackListDeleteTest() {

        assertNotNull(blackListRepository.findByNacebel(blackListEntry.getNacebel()));


        final ResponseEntity<MessageResponse> forEntity = restTemplate.exchange(CONTROLLER_MAPPING + "/blacklistdelete/" + blackListEntry.getId(), HttpMethod.DELETE, null,  MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        
        assertNull(blackListRepository.findByNacebel(blackListEntry.getNacebel()));
    }

    @Test
    public void createWhiteListEntryTest(){
        
       
        //Because only one entry with the same nacebel can exist at the same time, we will just test if an entry with the given expected nacebel code exists.

        MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();

        String expectedNacebelCode = "012345678";

        bodyBuilder.part("nacebel", expectedNacebelCode);

  

        webClient.post().uri(CONTROLLER_MAPPING + "/whitelist")
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .accept(MediaType.MULTIPART_FORM_DATA)
            .body(BodyInserters.fromMultipartData(bodyBuilder.build()))
            .exchange()
            .expectBody();

        
        assertNotNull(whiteListRepository.findByNacebel(expectedNacebelCode));
    }

    @Test
    public void createBlackListEntryTest(){
        
       
        //Because only one entry with the same nacebel can exist at the same time, we will just test if an entry with the given expected nacebel code exists.

        MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();

        String expectedNacebelCode = "012345679";

        bodyBuilder.part("nacebel", expectedNacebelCode);

  

        webClient.post().uri(CONTROLLER_MAPPING + "/blacklist")
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .accept(MediaType.MULTIPART_FORM_DATA)
            .body(BodyInserters.fromMultipartData(bodyBuilder.build()))
            .exchange()
            .expectBody();

        
        assertNotNull(blackListRepository.findByNacebel(expectedNacebelCode));
    }
}
