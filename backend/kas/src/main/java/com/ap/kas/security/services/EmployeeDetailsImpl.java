package com.ap.kas.security.services;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import com.ap.kas.models.Employee;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmployeeDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private String id;

    private String name;

    private String email;

    private Boolean active;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public EmployeeDetailsImpl(String id, String name, String email, Boolean active, String password, List<GrantedAuthority> authorities) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.active = active;
        this.password = password;
        this.authorities = authorities;
    }

    public static EmployeeDetailsImpl build(Employee employee) {
        List<GrantedAuthority> authorities = employee.getRoles().stream()
            .map(role -> new SimpleGrantedAuthority(role.name()))
            .collect(Collectors.toList());

        return new EmployeeDetailsImpl(employee.getId(), employee.getName(), employee.getEmail(), employee.getActive(), employee.getPassword(), authorities);
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return getActive();
    }
}
