package com.ap.kas.security.jwt;

import java.util.Date;

import com.ap.kas.security.services.CustomerDetailsImpl;
import com.ap.kas.security.services.EmployeeDetailsImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${Kas.app.jwtSecret}")
    private String jwtSecret;

    @Value("${Kas.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    
    /** 
     * @param authentication
     * @return String
     */
    public String generateJwtToken(Authentication authentication) {
        Date now = new Date();
        if(authentication.getPrincipal() instanceof CustomerDetailsImpl) {
            CustomerDetailsImpl customerPrincipal = (CustomerDetailsImpl)authentication.getPrincipal();

            return Jwts.builder()
                .setSubject(customerPrincipal.getCompanyNr())
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
        } else {
            EmployeeDetailsImpl employeePrincipal = (EmployeeDetailsImpl)authentication.getPrincipal();

            return Jwts.builder()
                .setSubject(employeePrincipal.getEmail())
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
        }
        
    }

    
    /** 
     * @param token
     * @return String
     */
    public String getPrincipalFromJwt(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }
    
    
    /** 
     * @param token
     * @return boolean
     */
    public boolean validateJwt(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
