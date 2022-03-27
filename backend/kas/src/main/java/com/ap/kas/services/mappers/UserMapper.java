package com.ap.kas.services.mappers;

import javax.validation.Valid;

import com.ap.kas.dtos.createdtos.CustomerCreateDto;
import com.ap.kas.dtos.createdtos.EmployeeCreateDto;
import com.ap.kas.dtos.readdtos.UserReadDto;
import com.ap.kas.dtos.updatedtos.CustomerInfoDto;
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

    public Customer createCustomerFromDto(CustomerCreateDto customerCreateDto) {
        return modelMapper.map(customerCreateDto, Customer.class);
    }

    public Customer addCustomerInformationFromDto(CustomerInfoDto customerInfoDto, Customer customer) {
        customer.setAddress(modelMapper.map(customerInfoDto, Address.class));
        customer.setPersonalInfo(modelMapper.map(customerInfoDto, CustomerInfo.class));
        customer.setPassword(passwordEncoder.encode(new StringBuffer(customerInfoDto.getPassword())));
        return customer;
    }

    public UserReadDto convertCustomerToUserReadDto(Customer customer) {
        UserReadDto output = modelMapper.map(customer, UserReadDto.class);
        output.addRole(customer.getRole());
        return output;
    }

    public UserReadDto convertEmployeeToUserReadDto(Employee employee) {
        return modelMapper.map(employee, UserReadDto.class);
    }

    public Employee createEmployeeFromDto(@Valid EmployeeCreateDto employeeCreateDto) {
        return modelMapper.map(employeeCreateDto, Employee.class);
    }
}
