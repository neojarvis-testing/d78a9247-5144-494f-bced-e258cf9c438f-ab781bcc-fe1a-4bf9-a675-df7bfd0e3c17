package com.examly.springapp.config;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.examly.springapp.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    @Autowired
    private JwtUtils utils;
    @Autowired
    private UserDetailsService userService;
    private final String AUTHORIZATION = "Authorization";
    private final String BEARER = "Bearer";
    private String jwtToken;
    private String username;
    private UserDetails userDetails;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
        boolean valid = checkUsername(request);
        if (valid) {
            valid = validateUser();
        }
        if (valid) {
            setCredentials(request);
        }
        filterChain.doFilter(request, response);
    }

    private boolean checkUsername(HttpServletRequest request) {
        String authHeader = request.getHeader(AUTHORIZATION);
        if (authHeader == null) {
            return false;
        }
        if (!authHeader.startsWith(BEARER)) {
            return false;
        }
        this.jwtToken = authHeader.substring(7);
        this.username = utils.extractUsername(this.jwtToken);
        return true;
    }

    private boolean validateUser() {
        if (this.username == null) {
            return false;
        }
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            return false;
        }
        UserDetails userDetails = userService.loadUserByUsername(this.username);
        this.userDetails = userDetails;
        if (!utils.validateToken(this.jwtToken, userDetails)) {
            return false;
        }
        return true;
    }

    private void setCredentials(HttpServletRequest request) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                this.userDetails, null, this.userDetails.getAuthorities());
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

}
