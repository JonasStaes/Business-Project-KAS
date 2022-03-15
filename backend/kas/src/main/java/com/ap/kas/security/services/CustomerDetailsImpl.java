package com.ap.kas.security.services;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import com.ap.kas.models.Customer;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomerDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private String id;

    private String name;

    private Boolean active;

    private int companyNr;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public CustomerDetailsImpl(String id, String name, Boolean active, int companyNr, String password, List<GrantedAuthority> authorities) {
        this.id = id;
        this.name = name;
        this.companyNr = companyNr;
        this.active = active;
        this.password = password;
        this.authorities = authorities;
    }

    public static CustomerDetailsImpl build(Customer customer) {
        List<GrantedAuthority> authorities = new LinkedList<GrantedAuthority>() {{
            add(new SimpleGrantedAuthority(customer.getRole().toString()));
        }};

        return new CustomerDetailsImpl(customer.getId(), customer.getName(), customer.getActive(), customer.getCompanyNr(), customer.getPassword(), authorities);
    }

    @Override
    public String getUsername() {
        return Integer.toString(getCompanyNr());
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
