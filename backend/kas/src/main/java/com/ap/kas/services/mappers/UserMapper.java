package com.ap.kas.services.mappers;

import com.ap.kas.dtos.createdtos.CustomerCreateDto;
import com.ap.kas.dtos.readdtos.CustomerReadDto;
import com.ap.kas.models.Customer;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    public Customer convertFromCreateDTO(CustomerCreateDto customerCreateDto) {
        return modelMapper.map(customerCreateDto, Customer.class);
    }

    public CustomerReadDto convertToReadDto(Customer customer) {
        return modelMapper.map(customer, CustomerReadDto.class);
    }
}
