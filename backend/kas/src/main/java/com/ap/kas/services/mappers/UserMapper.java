package com.ap.kas.services.mappers;

import com.ap.kas.dtos.createdtos.CustomerCreateDto;
import com.ap.kas.dtos.readdtos.UserReadDto;
import com.ap.kas.models.Customer;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    public Customer createCustomerFromDto(CustomerCreateDto customerCreateDto) {
        return modelMapper.map(customerCreateDto, Customer.class);
    }

    public UserReadDto convertCustomerToUserReadDto(Customer customer) {
        UserReadDto output = modelMapper.map(customer, UserReadDto.class);
        output.addRole(customer.getRole());
        return output;
    }
}
