package com.ap.kas.controllers;

import com.ap.kas.models.UserUpdateToken;
import com.ap.kas.models.User;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.UserUpdateTokenRepository;
import com.ap.kas.repositories.UserRepository;
import com.ap.kas.services.MailSender;

import java.util.NoSuchElementException;
import java.util.UUID;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.ap.kas.dtos.requestdtos.PasswordChangeRequestDto;
import com.ap.kas.dtos.updatedtos.PasswordChangeDto;

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
    private UserUpdateTokenRepository userUpdateTokenRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private MailSender mailSender;

    
    /** 
     * Sends a password change request to the given email
     * @param passwordChangeRequest - Dto containing the name and email adress of the user requesting the password change
     * @return ResponseEntity<MessageResponse> - Contains either a 200(OK) or a 400(BAD REQUEST)
     */
    @PostMapping("/request")
    public ResponseEntity<MessageResponse> createPasswordRequest(@Valid @ModelAttribute PasswordChangeRequestDto passwordChangeRequest) {
        logger.info("Incoming Password Change Request DTO:\n {}", passwordChangeRequest);
        try {
            User user = userRepository
                    .findByNameAndEmail(passwordChangeRequest.getName(), passwordChangeRequest.getEmail())
                    .orElseThrow();
            String token = UUID.randomUUID().toString();
            userUpdateTokenRepository.save(new UserUpdateToken(token, user));
            mailSender.sendPasswordRecoveryMail(user.getEmail(), token);

            return ResponseEntity.ok(new MessageResponse("Successfully sent password change request!"));
        } catch (NoSuchElementException e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to send password change request"));
        }
    }

    
    /** 
     * Changes a users password
     * @param passwordChangeDto - Contains the new password and the users token
     * @return ResponseEntity<MessageResponse> - Contains either a 200(OK) OR a 400(BAD REQUEST) if the token is invalid
     */
    @Transactional
    @PutMapping("/change")
    public ResponseEntity<MessageResponse> changePassword(@Valid @ModelAttribute PasswordChangeDto passwordChangeDto) {
        try {
            UserUpdateToken passwordCreateToken = userUpdateTokenRepository
                    .findByToken(passwordChangeDto.getToken()).orElseThrow();
            User user = passwordCreateToken.getUser();
            user.setPassword(passwordEncoder.encode(new StringBuffer(passwordChangeDto.getPassword())));
            userRepository.save(user);
            userUpdateTokenRepository.deleteByToken(passwordChangeDto.getToken());
            return ResponseEntity.ok(new MessageResponse("Successfully changed password!"));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid token"));
        }
    }
}
