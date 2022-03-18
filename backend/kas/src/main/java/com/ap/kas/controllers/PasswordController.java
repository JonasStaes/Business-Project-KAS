package com.ap.kas.controllers;

import com.ap.kas.models.PasswordCreateToken;
import com.ap.kas.models.User;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.PasswordCreateTokenRepository;
import com.ap.kas.repositories.UserRepository;
import com.ap.kas.services.MailSender;

import java.util.NoSuchElementException;
import java.util.UUID;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.ap.kas.dtos.requestdtos.PasswordChangeDto;
import com.ap.kas.dtos.requestdtos.PasswordChangeRequestDto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("change_password")
public class PasswordController {

    private static final Logger logger = LoggerFactory.getLogger(PasswordController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordCreateTokenRepository passwordCreateTokenRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private MailSender mailSender;
    
    @PostMapping("/request")
    public ResponseEntity<MessageResponse> createPasswordRequest(@Valid @ModelAttribute PasswordChangeRequestDto passwordChangeRequest) {
        logger.info("Incoming Password Change Request DTO:\n {}", passwordChangeRequest);
        try {
            User user = userRepository.findByNameAndEmail(passwordChangeRequest.getName(), passwordChangeRequest.getEmail()).orElseThrow();
            String token = UUID.randomUUID().toString();
            passwordCreateTokenRepository.save(new PasswordCreateToken(token, user));
            String link = "http://localhost:3000/kas/change_password/" + token;
            String message = "<a href=\"" + link + "\"> Click this link to create your password and activate your account.</a>";
            mailSender.sendMail(user.getEmail(), "Your account at Omega has been created", message);

            return ResponseEntity.ok(new MessageResponse("Successfully sent password change request!"));
        } catch (NoSuchElementException e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to send password change request"));
        }
    }

    @PutMapping("/")
    @Transactional
    public ResponseEntity<MessageResponse> changePassword(@Valid @ModelAttribute PasswordChangeDto passwordChangeDto) {
        try {
            PasswordCreateToken passwordCreateToken = passwordCreateTokenRepository.findByToken(passwordChangeDto.getToken()).orElseThrow();
            User user = passwordCreateToken.getUser();
            user.setPassword(passwordEncoder.encode(new StringBuffer(passwordChangeDto.getPassword())));
            user.setActive(true);
            userRepository.save(user);
            passwordCreateTokenRepository.deleteByToken(passwordChangeDto.getToken());
            return ResponseEntity.ok(new MessageResponse("Successfully set password!"));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid token"));
        }
    }
}
