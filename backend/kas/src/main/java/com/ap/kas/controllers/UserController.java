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
import com.ap.kas.dtos.updatedtos.CustomerInfoDto;
import com.ap.kas.dtos.updatedtos.EmployeeInfoDto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * The UserController class contains methods for the finalization of a user.
 */

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

    
    /** 
     * Sends a finalization mail to a given customer
     * @param id - Id of the given customer
     * @return ResponseEntity<MessageResponse> Contains either a 200(OK) or a 400(BAD REQUEST) when the customer does not exist
     */
    @PostMapping("/requestCustomer/{id}")
    public ResponseEntity<MessageResponse> requestCustomerFinalization(@PathVariable("id") String id) {
        try {
            Customer customer = customerRepository.findById(id).orElseThrow();
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

    
    /** 
     * Finalizes a customer
     * @param customerInfoDto - Dto containing information of the customer to be finalized
     * @return ResponseEntity<MessageResponse> - Contains either a 200(OK) OR a 400(OK) when the token is invalid or the finalization fails in any other way
     */
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

    
    /** 
     * Sends a finalization mail to a given employee
     * @param id - Id of the given employee
     * @return ResponseEntity<MessageResponse> Contains either a 200(OK) or a 400(BAD REQUEST) when the employee does not exist
     */
    @PostMapping("/requestEmployee/{id}")
    public ResponseEntity<MessageResponse> requestEmployeeFInalization(@PathVariable("id") String id) {
        try {
            Employee employee = employeeRepository.findById(id).orElseThrow();
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

    
    /** 
     * Finalizes an employee
     * @param customerInfoDto - Dto containing information of the employee to be finalized
     * @return ResponseEntity<MessageResponse> - Contains either a 200(OK) OR a 400(OK) when the token is invalid or the finalization fails in any other way
     */
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
