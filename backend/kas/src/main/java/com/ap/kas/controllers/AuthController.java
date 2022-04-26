package com.ap.kas.controllers;

import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.ap.kas.dtos.requestdtos.CustomerLoginRequestDto;
import com.ap.kas.dtos.requestdtos.EmployeeLoginRequestDto;
import com.ap.kas.payload.response.JwtResponse;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CustomerRepository;
import com.ap.kas.security.jwt.JwtUtils;
import com.ap.kas.security.services.CustomerDetailsImpl;
import com.ap.kas.security.services.EmployeeDetailsImpl;
import com.ap.kas.services.mappers.UserMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("signin")
public class AuthController {

    @Autowired
    UserMapper userMapper;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;
    
    @PostMapping("/customer")
    public ResponseEntity<MessageResponse> authenticateCustomer(@Valid @ModelAttribute CustomerLoginRequestDto loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getCompanyNr(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            CustomerDetailsImpl userDetails = (CustomerDetailsImpl)authentication.getPrincipal();
            Set<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toSet());

            return ResponseEntity.ok(new MessageResponse("Successfully logged in!", new JwtResponse(jwt, userDetails.getId(), roles)));
        } catch (Error e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Something went wrong"));
        }
    }

    @PostMapping("/employee")
    public ResponseEntity<MessageResponse> authenticateEmployee(@Valid @ModelAttribute EmployeeLoginRequestDto loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        EmployeeDetailsImpl userDetails = (EmployeeDetailsImpl)authentication.getPrincipal();
        Set<String> roles = userDetails.getAuthorities().stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toSet());

        return ResponseEntity.ok(new MessageResponse("Successfully logged in!", new JwtResponse(jwt, userDetails.getId(), roles)));
    }
}
