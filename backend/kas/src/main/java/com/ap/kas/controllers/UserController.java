package com.ap.kas.controllers;

import com.ap.kas.models.User;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.UserRepository;
import com.ap.kas.services.mappers.UserMapper;

import java.util.LinkedList;
import java.util.List;

import javax.validation.Valid;

import com.ap.kas.dtos.createdtos.UserCreateDto;
import com.ap.kas.dtos.readdtos.UserReadDto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(User.class);

    @Autowired
    private UserMapper userMapper;
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public ResponseEntity<MessageResponse> readUsers() {
        try {
            List<UserReadDto> users = new LinkedList<UserReadDto>();
            userRepository.findAll().forEach(cr -> {
                users.add(userMapper.convertToReadDto(cr));
            });
            System.out.println("here");
            return ResponseEntity.ok(new MessageResponse("Got all users!", users));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to map a user"));
        }
    }

    @PostMapping("/")
    public ResponseEntity<MessageResponse> createCreditRequest(@Valid @RequestBody UserCreateDto newUser) {
        logger.info("Incoming Credit Request DTO:\n {}", newUser);
        try {
            User user = userMapper.convertFromCreateDTO(newUser);        
            logger.info("New User:\n {}", user);
            userRepository.save(user);
            return ResponseEntity.ok(new MessageResponse("Successfully created credit user!"));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create credit user"));
        }
    }


    
}
