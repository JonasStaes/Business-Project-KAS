package com.ap.kas.controllers;

import com.ap.kas.models.Customer;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CustomerRepository;
import com.ap.kas.services.mappers.UserMapper;

import java.util.LinkedList;
import java.util.List;

import javax.validation.Valid;

import com.ap.kas.dtos.createdtos.CustomerCreateDto;
import com.ap.kas.dtos.readdtos.CustomerReadDto;

import lombok.*;

import org.apache.catalina.connector.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("admin")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserMapper userMapper;
    
    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/allcustomers")
    public ResponseEntity<MessageResponse> readUsers() {
        try {
            List<CustomerReadDto> customers = new LinkedList<CustomerReadDto>();
            customerRepository.findAll().forEach(cr -> {
                customers.add(userMapper.convertToReadDto(cr));
            });
            return ResponseEntity.ok(new MessageResponse("Got all users!", customers));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to map a user"));
        }
    }

    @PostMapping("/")
    public ResponseEntity<MessageResponse> createCustomer(@Valid @ModelAttribute CustomerCreateDto newCustomer) {
        logger.info("Incoming Credit Request DTO:\n {}", newCustomer);
        try {
            if(customerRepository.existsByCompanyNr(newCustomer.getCompanyNr())) {
                throw new IllegalArgumentException();
            }
            Customer customer = userMapper.convertFromCreateDTO(newCustomer);
            customer.setActive(false);
            logger.info("New User:\n {}", customer);
            customerRepository.save(customer);
            return ResponseEntity.ok(new MessageResponse("Successfully created user!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Cannot create 2 users with same company number"));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create user"));
        } 
    }

    @PutMapping(value="/allcustomers/{id}")
    public ResponseEntity<MessageResponse> deactivateCustomer(@PathVariable String id) {
        logger.info("Incoming Credit Request DTO:\n {}", id);
        try{
            Customer toBeUpdatedCustomer = customerRepository.getById(id);
            toBeUpdatedCustomer.setActive(false);
            customerRepository.save(toBeUpdatedCustomer);
            logger.info("Customer deactivated");
            return ResponseEntity.ok(new MessageResponse("Succesfully deactivated customer!"));
        } catch(Exception e){
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to deactivate customer"));
        }
        
    }
}
