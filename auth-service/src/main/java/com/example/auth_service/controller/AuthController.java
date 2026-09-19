package com.example.auth_service.controller;

import com.example.auth_service.model.User;
import com.example.auth_service.service.AuthService;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestParam String email,
            @RequestParam String password) {

        return authService.login(email, password);
    }

    @GetMapping("/test")
    public String test() {
        return "JWT authentication successful!";
    }

    @GetMapping("/admin-test")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminTest() {
        return "Admin access successful!";
    }

}

// return authService.register(user); // wadiya hithanna epa, return
// authService.register(user); kiynne class eken hadpau objec eken e class eek
// thyena .register() kiyn methos eka call kirima, ekata user kiyala apu object
// ekak widyata apu data dika pss karanwwa, echcharayi.