package com.ap.kas.services.mappers;

import com.ap.kas.dtos.createdtos.UserCreateDto;
import com.ap.kas.dtos.readdtos.UserReadDto;
import com.ap.kas.models.User;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    public User convertFromCreateDTO(UserCreateDto userCreateDto) {
        return modelMapper.map(userCreateDto, User.class);
    }

    public UserReadDto convertToReadDto(User user) {
        return modelMapper.map(user, UserReadDto.class);
    }
}
