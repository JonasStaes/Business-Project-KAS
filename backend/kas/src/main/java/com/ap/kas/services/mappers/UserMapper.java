package com.ap.kas.services.mappers;

import javax.validation.Valid;

import com.ap.kas.dtos.createdtos.CustomerCreateDto;
import com.ap.kas.dtos.createdtos.EmployeeCreateDto;
import com.ap.kas.dtos.readdtos.UserReadDto;
import com.ap.kas.dtos.updatedtos.CustomerInfoDto;
import com.ap.kas.dtos.updatedtos.EmployeeInfoDto;
import com.ap.kas.models.Address;
import com.ap.kas.models.Customer;
import com.ap.kas.models.Employee;
import com.ap.kas.models.CustomerInfo;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    
    /** 
     * Converts a given Customer object to a UserReadDto object
     * @param customer - The given Customer object
     * @return UserReadDto - The converted UserReadDto object
     */
    public UserReadDto convertCustomerToUserReadDto(Customer customer) {
        UserReadDto output = modelMapper.map(customer, UserReadDto.class);
        output.addRole(customer.getRole());
        return output;
    }

    
    /** 
     * Converts a given CustomerCreateDto object to a Customer object
     * @param customerCreateDto - The given CustomerCreateDto object
     * @return Customer - The converted Customer object
     */
    public Customer createCustomerFromDto(CustomerCreateDto customerCreateDto) {
        return modelMapper.map(customerCreateDto, Customer.class);
    }

    
    /** 
     * Adds the given CustomerInfoDto object fields to the given Customer object
     * @param customerInfoDto - The given CustomerInfoDto object
     * @param customer - The given Customer object
     * @return Customer - The updated Customer object with the new information added
     */
    public Customer addCustomerInformationFromDto(CustomerInfoDto customerInfoDto, Customer customer) {
        customer.setAddress(modelMapper.map(customerInfoDto, Address.class));
        customer.setPersonalInfo(modelMapper.map(customerInfoDto, CustomerInfo.class));
        customer.setPassword(passwordEncoder.encode(new StringBuffer(customerInfoDto.getPassword())));
        return customer;
    }

    
    /** 
     * Converts a given Employee object to a UserReadDto object
     * @param employee - The given Employee object
     * @return UserReadDto
     */
    public UserReadDto convertEmployeeToUserReadDto(Employee employee) {
        return modelMapper.map(employee, UserReadDto.class);
    }

    
    /** 
     * Converts a given EmployeeCreateDto object to an Employee object
     * @param employeeCreateDto - The given EmployeeCreateDto object
     * @return Employee - The Converted Employee object
     */
    public Employee createEmployeeFromDto(@Valid EmployeeCreateDto employeeCreateDto) {
        return modelMapper.map(employeeCreateDto, Employee.class);
    }

    
    /** 
     * Adds the given EmployeeInfoDto object fields to the given Employee object
     * @param employeeInfoDto - The given EmployeeInfoDto object
     * @param employee - The given Employee object
     * @return Employee - The updated Employee object with the new information added
     */
    public Employee addEmployeeInformationFromDto(EmployeeInfoDto employeeInfoDto, Employee employee) {
        employee.setPassword(passwordEncoder.encode(new StringBuffer(employeeInfoDto.getPassword())));
        return employee;
    }
}
