package com.ap.kas.config;

import com.ap.kas.models.Role;
import com.ap.kas.security.jwt.AuthEntryPointJwt;
import com.ap.kas.security.jwt.AuthTokenFilter;
import com.ap.kas.security.services.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Order(2)
@Configuration
@EnableWebSecurity
@Profile({Profiles.PRODUCTION, Profiles.DEMO})
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    AuthEntryPointJwt unauthorizedHandler;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
            .authorizeRequests()
            .antMatchers("/").permitAll()
            .antMatchers("/signin/**").permitAll()
            .antMatchers("/change_password/**").permitAll()
            .antMatchers("/user/**").permitAll()
            .antMatchers("/h2-console/**").permitAll()
            .antMatchers("/enums/**").hasAnyAuthority(Role.KLANT.toString(), Role.KANTOOR_MEDEWERKER.toString(), Role.KREDIET_BEOORDELAAR.toString(), Role.COMPLIANCE.toString())
            .antMatchers("/credit_request/**").hasAnyAuthority(Role.KLANT.toString(), Role.KANTOOR_MEDEWERKER.toString())
            .antMatchers("/admin/**").hasAnyAuthority(Role.ADMINISTRATOR.toString())
            .antMatchers("/rating_agent/**").hasAuthority(Role.KREDIET_BEOORDELAAR.toString())
            .antMatchers("/compliance/**").hasAnyAuthority(Role.COMPLIANCE.toString())
            .anyRequest().authenticated().and()
            .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }
    
}
