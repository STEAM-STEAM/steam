package com.steam.steam.user;

import com.steam.steam.user.dto.LoginRequestDto;
import com.steam.steam.user.dto.MessageResponseDto;
import com.steam.steam.user.dto.UserRequestDto;
import com.steam.steam.user.exception.PasswordValidationException;
import com.steam.steam.user.exception.UserAlreadyExistsException;
import com.steam.steam.user.exception.UserIdNotExistsException;
import com.steam.steam.user.exception.UserIdValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/join")
    public ResponseEntity<MessageResponseDto> joinUser(@RequestBody UserRequestDto userDto) {
        try {
            userService.join(userDto);
            return ResponseEntity.ok().body(new MessageResponseDto("success"));
        } catch (UserAlreadyExistsException | UserIdValidationException e) {
            return ResponseEntity.ok().body(new MessageResponseDto("id_error"));
        } catch (PasswordValidationException e) {
            return ResponseEntity.ok().body(new MessageResponseDto("pw_error"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.ok().body(new MessageResponseDto("region_error"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<MessageResponseDto> loginUser(@RequestBody LoginRequestDto loginDto) {
        try {
            userService.login(loginDto);
            return ResponseEntity.ok().body(new MessageResponseDto("success"));
        } catch (UserIdNotExistsException e) {
            return ResponseEntity.ok().body(new MessageResponseDto("id_error"));
        } catch (PasswordValidationException e) {
            return ResponseEntity.ok().body(new MessageResponseDto("pw_error"));
        }
    }
}