package com.ap.kas.payload.response;

import java.util.Set;

import org.springframework.beans.factory.annotation.Value;

import lombok.Data;

@Data
public class JwtResponse {
    private final String accessToken;

    @Value("${Kas.app.jwtBearer}")
    private String tokenType;

    private final String id;

    private final Set<String> roles;
}
