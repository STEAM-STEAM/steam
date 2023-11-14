package com.steam.steam.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/join")
    public ResponseEntity<Object> joinUser(@RequestBody UserDto userDto) {
        try {
            userService.join(userDto);
            return ResponseEntity.ok().body("{\"message\": \"success\"}");
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.ok().body("{\"message\": \"id_error\"}");
        } catch (PasswordValidationException e) {
            return ResponseEntity.ok().body("{\"message\": \"pw_error\"}");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.ok().body("{\"message\": \"region_error\"}");
        }
    }
//    @PostMapping("/login")
//    public String loginUser(@RequestBody User user) {
//        if (userService.login(user)) {
//            return "Login successful.";
//        } else {
//            return "Login failed. Invalid credentials.";
//        }
//    }
}