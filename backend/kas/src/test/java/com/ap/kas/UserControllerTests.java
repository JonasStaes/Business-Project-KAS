package com.ap.kas;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;

import java.util.LinkedList;
import java.util.List;

import com.ap.kas.dtos.readdtos.UserReadDto;
import com.ap.kas.models.Roles;
import com.ap.kas.models.User;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.UserRepository;
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
    private UserRepository userRepository;

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
        user.setRole(Roles.CUSTOMER);
    }

    @Test
    public void readAllCapabilitiesTest() {
        final ResponseEntity<MessageResponse> forEntity = restTemplate.getForEntity(CONTROLLER_MAPPING + "/all", MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        List<UserReadDto> expectedList = new LinkedList<UserReadDto>();
        userRepository.findAll().forEach(cr -> {
            expectedList.add(userMapper.convertToReadDto(cr));
        });

        List<UserReadDto> actualList = new LinkedList<UserReadDto>();
        ((List<Object>)forEntity.getBody().getData()).forEach(o -> {
            actualList.add(modelMapper.map(o, UserReadDto.class));
        });
        assertIterableEquals(expectedList, actualList);
    }
    
}
