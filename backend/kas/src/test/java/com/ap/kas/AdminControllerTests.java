package com.ap.kas;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.Period;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import com.ap.kas.config.Profiles;
import com.ap.kas.dtos.createdtos.CreditRequestCreateDto;
import com.ap.kas.dtos.readdtos.CreditRequestReadDto;
import com.ap.kas.dtos.readdtos.UserReadDto;
import com.ap.kas.dtos.requestdtos.CustomerLoginRequestDto;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.models.Customer;
import com.ap.kas.models.Employee;
import com.ap.kas.models.InvestmentType;
import com.ap.kas.models.Role;
import com.ap.kas.models.User;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CreditRequestRepository;
import com.ap.kas.repositories.CustomerRepository;
import com.ap.kas.repositories.EmployeeRepository;
import com.ap.kas.repositories.FileStorageRepository;
import com.ap.kas.repositories.UserRepository;
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
public class AdminControllerTests {

    private static final String CONTROLLER_MAPPING = "/admin";
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
    private UserMapper userMapper;

    @Autowired
    private FileStorageRepository fileStorageRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    private Customer testCustomer;
    private Admin testAdmin;

    private CreditRequest creditRequest;

    @Autowired
    private UserRepository userRepository;


    Faker faker = new Faker(new Locale("nl-BE"));
    FakeValuesService fakeValuesService = new FakeValuesService(new Locale("nl-BE"), new RandomService());

    @BeforeEach
    public void init() {
        
        Employee testAdmin = new Employee(faker.name().fullName(), "testAdmin@gmail.com", true, passwordEncoder.encode(new StringBuffer("employee")));
        testAdmin.addRole(Role.ADMINISTRATOR);
        testCustomer = new Customer("testCustomer", "testCustomer@gmail.com", true, passwordEncoder.encode(new StringBuffer("testCustomer")), "1234567890");
        //initialize test data
        creditRequest = new CreditRequest("Test Request", 200.0f, 100.0f, Period.ofMonths(2), InvestmentType.ONROERENDE_GOEDEREN, testCustomer);
    }

    @Test
    public void readAllCapabilitiesTest() {

        final ResponseEntity<MessageResponse> forEntity = restTemplate.getForEntity(CONTROLLER_MAPPING + "/allUsers" , MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());


        List<UserReadDto> expectedList = new LinkedList<UserReadDto>();
        customerRepository.findAll().forEach(customer -> {
            expectedList.add(userMapper.convertCustomerToUserReadDto(customer));
        });

        employeeRepository.findAll().forEach(employee -> {
            expectedList.add(userMapper.convertEmployeeToUserReadDto(employee));
        });


        List<UserReadDto> actualList = new LinkedList<UserReadDto>();
        ((List<Object>)forEntity.getBody().getData()).forEach(o -> {
            actualList.add(modelMapper.map(o, UserReadDto.class));
        });
        assertIterableEquals(expectedList, actualList);
    }


    @Test
    public void getEmployeeRolesTest(){
        final ResponseEntity<MessageResponse> forEntity = restTemplate.getForEntity(CONTROLLER_MAPPING + "/employeeRoles" , MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        List<Role> expectedList = new LinkedList<Role>();
        expectedList = Role.getEmployeeRoles();

        List<Role> actualList = new LinkedList<Role>();
        ((List<Object>)forEntity.getBody().getData()).forEach(o -> {
            actualList.add(modelMapper.map(o, Role.class));
        });
        assertIterableEquals(expectedList, actualList);
    }

    @Test
    public void getCustomerRolesTest(){
        final ResponseEntity<MessageResponse> forEntity = restTemplate.getForEntity(CONTROLLER_MAPPING + "/customerRoles" , MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        List<Role> expectedList = new LinkedList<Role>();
        expectedList = Role.getCustomerRoles();

        List<Role> actualList = new LinkedList<Role>();
        ((List<Object>)forEntity.getBody().getData()).forEach(o -> {
            actualList.add(modelMapper.map(o, Role.class));
        });
        assertIterableEquals(expectedList, actualList);
    }

    @Test public void deactivateUserTest(){

        assertTrue(testCustomer.getActive());
        customerRepository.save(testCustomer);  
        

        final ResponseEntity<MessageResponse> forEntity = restTemplate.exchange(CONTROLLER_MAPPING + "/users/" + testCustomer.getId(), HttpMethod.PUT, null,  MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        Customer deactivatedCustomer = customerRepository.findById(testCustomer.getId()).get();

        assertFalse(deactivatedCustomer.getActive());

    }

    @Test public void createCustomerTest(){


        MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();
     

        bodyBuilder.part("name", "testName");
        bodyBuilder.part("email", "testEmail@outlook.com");
        bodyBuilder.part("companyNr", "1234567890" );

  

        webClient.post().uri(CONTROLLER_MAPPING + "/newCustomer")
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .accept(MediaType.MULTIPART_FORM_DATA)
            .body(BodyInserters.fromMultipartData(bodyBuilder.build()))
            .exchange()
            .expectBody();

        
        assertNotNull(customerRepository.findByCompanyNr("1234567890").get());
    }

    @Test public void createEmployeeTest(){


        MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();

       

       

        bodyBuilder.part("name", "testName1");
        bodyBuilder.part("email", "testEmail@outlook.com");
        bodyBuilder.part("roles", "[KANTOOR_MEDEWERKER]" );

  

        webClient.post().uri(CONTROLLER_MAPPING + "/newEmployee")
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .accept(MediaType.MULTIPART_FORM_DATA)
            .body(BodyInserters.fromMultipartData(bodyBuilder.build()))
            .exchange()
            .expectBody();

        


        assertNotNull(employeeRepository.findByName("testName1"));
      
    }
}
