package com.ap.kas;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;

import java.util.LinkedList;
import java.util.List;

import com.ap.kas.dtos.createdtos.CustomerCreateDto;
import com.ap.kas.dtos.readdtos.CustomerReadDto;
import com.ap.kas.models.Role;
import com.ap.kas.models.User;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CustomerRepository;
import com.ap.kas.services.mappers.UserMapper;

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
public class UserControllerTests {

    private static final String CONTROLLER_MAPPING = "/user";

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private CustomerRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ModelMapper modelMapper;

    private static User user;

    @BeforeAll
    public static void init() {
        //initialize test data
        user = new User();
        user.setName("Test User");
        user.setActive(true);
        user.setEmail("test@outlook.com");
    }

    @Test
    public void readAllCapabilitiesTest() {
        final ResponseEntity<MessageResponse> forEntity = restTemplate.getForEntity(CONTROLLER_MAPPING + "/all", MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        List<CustomerReadDto> expectedList = new LinkedList<CustomerReadDto>();
        userRepository.findAll().forEach(cr -> {
            expectedList.add(userMapper.convertToReadDto(cr));
        });

        List<CustomerReadDto> actualList = new LinkedList<CustomerReadDto>();
        ((List<Object>)forEntity.getBody().getData()).forEach(o -> {
            actualList.add(modelMapper.map(o, CustomerReadDto.class));
        });
        assertIterableEquals(expectedList, actualList);
    }

    @Test
    public void createNewUserTest() {
        //create dto for test
        CustomerCreateDto dto = new CustomerCreateDto();
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        //dto.setRole(user.getRole());;

        //get actual result from mock API call
        final ResponseEntity<MessageResponse> forEntity = restTemplate.postForEntity(CONTROLLER_MAPPING + "/", dto, MessageResponse.class);

        //assert that status code is ok, meaning the request was successful
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        //assert that all PASSED fields are the same, aka all fields in the dto.
        //we can't test if the two objects are the same, even with hashcode and equals overrides
        //since the test data doesn't have an ID, and even if it did it's ID wouldn't match the DTO since they're separate entries in the repo
        User actualUser = userRepository.findByName(user.getName()).get();
        assertEquals(user.getName(), actualUser.getName());
        assertEquals(user.getEmail(), actualUser.getEmail());
        //assertEquals(user.getRole(), actualUser.getRole());
        
    }


    
}
