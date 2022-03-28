package com.ap.kas.controllers;

import com.ap.kas.models.Customer;
import com.ap.kas.models.Employee;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CustomerRepository;
import com.ap.kas.repositories.EmployeeRepository;
import com.ap.kas.services.MailSender;
import com.ap.kas.services.mappers.UserMapper;
import com.ap.kas.repositories.UserUpdateTokenRepository;
import com.ap.kas.models.UserUpdateToken;

import java.util.NoSuchElementException;
import java.util.UUID;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.ap.kas.dtos.requestdtos.CustomerFinalizationRequest;
import com.ap.kas.dtos.requestdtos.EmployeeFinalizationRequest;
import com.ap.kas.dtos.updatedtos.CustomerInfoDto;
import com.ap.kas.dtos.updatedtos.EmployeeInfoDto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserMapper userMapper;
    
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserUpdateTokenRepository userUpdateTokenRepository;

    @Autowired
    private MailSender mailSender;

    @PostMapping("/requestCustomer")
    public ResponseEntity<MessageResponse> requestCustomerFinalization(@Valid @ModelAttribute CustomerFinalizationRequest customerFinalizationRequest) {
        try {
            Customer customer = customerRepository.findByCompanyNr(customerFinalizationRequest.getCompanyNr()).orElseThrow();
            String token = UUID.randomUUID().toString();
            userUpdateTokenRepository.save(new UserUpdateToken(token, customer));
            mailSender.sendCustomerFinalizationMail(customer.getEmail(), token);

            return ResponseEntity.ok(new MessageResponse("Successfully sent customer finalization request!"));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Cannot request information of non existent customer"));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to request customer finalization"));
        }
    }

    @Transactional
    @PutMapping("/finalizeCustomer")
    public ResponseEntity<MessageResponse> finalizeCustomer(@Valid @ModelAttribute CustomerInfoDto customerInfoDto) {
        try {
            UserUpdateToken userUpdateToken = userUpdateTokenRepository.findByToken(customerInfoDto.getToken()).orElseThrow();
            Customer customer = userMapper.addCustomerInformationFromDto(customerInfoDto, (Customer)userUpdateToken.getUser());
            customer.setActive(true);
            customerRepository.save(customer);
            userUpdateTokenRepository.delete(userUpdateToken);
            return ResponseEntity.ok(new MessageResponse("Successfully finalized customer!"));
        } catch (NoSuchElementException e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid token"));
        } catch(Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to finalize customer"));
        }
    }

    @PostMapping("/requestEmployee")
    public ResponseEntity<MessageResponse> requestEmployeeFInalization(@Valid @ModelAttribute EmployeeFinalizationRequest employeeFinalizationRequest) {
        try {
            Employee employee = employeeRepository.findByEmail(employeeFinalizationRequest.getEmail()).orElseThrow();
            String token = UUID.randomUUID().toString();
            userUpdateTokenRepository.save(new UserUpdateToken(token, employee));
            mailSender.sendEmployeeFinalizationMail(employee.getEmail(), token);

            return ResponseEntity.ok(new MessageResponse("Successfully sent employee finalization request!"));
        } catch (NoSuchElementException e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Cannot request information of non existent employee"));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to request employee finalization"));
        }
    }

    @Transactional
    @PutMapping("/finalizeEmployee")
    public ResponseEntity<MessageResponse> finalizeEmployee(@Valid @ModelAttribute EmployeeInfoDto employeeInfoDto) {
        try {
            UserUpdateToken userUpdateToken = userUpdateTokenRepository.findByToken(employeeInfoDto.getToken()).orElseThrow();
            Employee employee = userMapper.addEmployeeInformationFromDto(employeeInfoDto, (Employee)userUpdateToken.getUser());
            employee.setActive(true);
            employeeRepository.save(employee);
            userUpdateTokenRepository.delete(userUpdateToken);
            return ResponseEntity.ok(new MessageResponse("Successfully finalized employee!"));
        } catch (NoSuchElementException e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid token"));
        } catch(Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to finalize employee"));
        }
    }
}
