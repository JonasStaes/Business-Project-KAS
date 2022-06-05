package com.ap.kas.controllers;

import com.ap.kas.models.Customer;
import com.ap.kas.models.Employee;
import com.ap.kas.models.Role;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CustomerRepository;
import com.ap.kas.repositories.EmployeeRepository;
import com.ap.kas.services.mappers.UserMapper;

import java.util.LinkedList;
import java.util.List;

import javax.validation.Valid;

import com.ap.kas.dtos.createdtos.CustomerCreateDto;
import com.ap.kas.dtos.createdtos.EmployeeCreateDto;
import com.ap.kas.dtos.readdtos.UserReadDto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 * The AdminController is a RestController class that contains all methods needed to perform admin-related CRUD operations on the database.
 */
@RestController
@RequestMapping("admin")
public class AdminController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private UserMapper userMapper;
    
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    
    /** 
     * Returns a  list of all existing users, both employees and customers
     * @return ResponseEntity<MessageResponse> - Contains a 200(OK) with the list of all existing users or a 400(BAD REQUEST)
     */
    @GetMapping("/allUsers")
    public ResponseEntity<MessageResponse> readUsers() {
        try {
            List<UserReadDto> users = new LinkedList<UserReadDto>();
            customerRepository.findAll().forEach(customer -> {
                users.add(userMapper.convertCustomerToUserReadDto(customer));
            });

            employeeRepository.findAll().forEach(employee -> {
                users.add(userMapper.convertEmployeeToUserReadDto(employee));
            });
            
            return ResponseEntity.ok(new MessageResponse("Got all users!", users));
        } catch (Exception e) {
            logger.error("Failed to map a user", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to map a user"));
        }
    }

    
    /** 
     * Rreturns a list of all possible employee roles
     * @return ResponseEntity<MessageResponse> - Either returns a 200(OK) with the list of roles or a 400(BAD REQUEST)
     */
    @GetMapping("/employeeRoles")
    public ResponseEntity<MessageResponse> readEmployeeRoles() {
        try {
            return ResponseEntity.ok(new MessageResponse("Got employee roles!", Role.getEmployeeRoles()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to get employee roles"));
        }
    }

    
    /** 
     * Returns a list of all possible customer roles
     * @return ResponseEntity<MessageResponse> - Contains a 200(OK) with the list of roles or a 400(BAD REQUEST)
     */
    @GetMapping("/customerRoles")
    public ResponseEntity<MessageResponse> readCustomerRoles() {
        try {
            return ResponseEntity.ok(new MessageResponse("Got customer roles!", Role.getCustomerRoles()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to get customer roles"));
        }
    }

    
    /** 
     * Creates a new customer
     * @param newCustomer - The customer to be created
     * @return ResponseEntity<MessageResponse> - Contains a 200(OK) or 400(BAD REQUEST). Can also contain a 400(BAD REQUEST) when trying to create a customer with an already existing company number.
     */
    @PostMapping("/newCustomer")
    public ResponseEntity<MessageResponse> createCustomer(@Valid @ModelAttribute CustomerCreateDto newCustomer) {
        logger.info("Incoming Customer Create DTO:\n {}", newCustomer);
        try {
            if(customerRepository.existsByCompanyNr(newCustomer.getCompanyNr())) {
                throw new IllegalArgumentException("CompanyNr already in use");
            }
            Customer customer = userMapper.createCustomerFromDto(newCustomer);
            customer.setActive(false);
            logger.info("New Customer:\n {}", customer);
            customerRepository.save(customer);
            return ResponseEntity.ok(new MessageResponse("Successfully created customer!", userMapper.convertCustomerToUserReadDto(customer)));
        } catch (IllegalArgumentException e) {
            logger.error("Cannot create 2 customers with same company number", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Cannot create 2 customers with same company number"));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create customer"));
        } 
    }

    
    /**  
     * Creates a new employee
     * @param newEmployee - The employee to be created
     * @return ResponseEntity<MessageResponse> - Contains a 200(OK) with the created employee object or a 400(BAD REQUEST)
     */
    @PostMapping("/newEmployee")
    public ResponseEntity<MessageResponse> createEmployee(@Valid @ModelAttribute EmployeeCreateDto newEmployee) {
        logger.info("Incoming Employee Create DTO:\n {}", newEmployee);
        try {
            Employee employee = userMapper.createEmployeeFromDto(newEmployee);
            employee.setActive(false);
            logger.info("New Employee:\n {}", employee);
            employeeRepository.save(employee);
            return ResponseEntity.ok(new MessageResponse("Successfully created employee!", userMapper.convertEmployeeToUserReadDto(employee)));
        } catch (Exception e){
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create employee"));
        }
    }

    
    /** 
     * Deletes a given user
     * @param id - the id of the given user
     * @return ResponseEntity<MessageResponse> - Contains a 200(OK) or a 400(BAD REQUEST)
     */
    @PutMapping("/users/{id}")
    public ResponseEntity<MessageResponse> deactivateUser(@PathVariable String id) {
        logger.info("Incoming deactivation request:\n {}", id);
        try{
            if(customerRepository.existsById(id)){
                Customer toBeUpdatedCustomer = customerRepository.getById(id);
                toBeUpdatedCustomer.setActive(false);
                customerRepository.save(toBeUpdatedCustomer);
                logger.info("Customer deactivated");
            }
            else{
                Employee toBeUpdatedEmployee = employeeRepository.getById(id);
                toBeUpdatedEmployee.setActive(false);
                employeeRepository.save(toBeUpdatedEmployee);
                logger.info("Employee deactivated");
            }
            
            return ResponseEntity.ok(new MessageResponse("Succesfully deactivated user!"));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create user"));
        }
    }
}
