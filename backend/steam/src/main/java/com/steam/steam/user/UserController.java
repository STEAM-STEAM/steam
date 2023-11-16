package com.steam.steam.user;

import com.steam.steam.FileStorageService;
import com.steam.steam.user.dto.LoginRequestDto;
import com.steam.steam.user.dto.MessageResponseDto;
import com.steam.steam.user.dto.UserImageResponseDto;
import com.steam.steam.user.dto.UserRequestDto;
import com.steam.steam.user.exception.PasswordValidationException;
import com.steam.steam.user.exception.UserAlreadyExistsException;
import com.steam.steam.user.exception.UserIdNotExistsException;
import com.steam.steam.user.exception.UserIdValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {
    private final UserService userService;
    private final FileStorageService fileStorageService;

    private static final Path userImageDir = Path.of("./src/main/java/com/steam/steam/user/pic/");


    @Autowired
    public UserController(UserService userService, FileStorageService fileStorageService) {
        this.userService = userService;
        this.fileStorageService = fileStorageService;
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

    @PostMapping("/user/profile/image")
    public ResponseEntity<MessageResponseDto> uploadUserProfileImage(
            @RequestParam("userId") String userId,
            @RequestParam("image") MultipartFile image) {

        Path filePath = userImageDir.resolve(userId).resolve("profile.jpg");
        userService.uploadProfileImage(userId, filePath);
        fileStorageService.storeImage(image, filePath);

        return ResponseEntity.ok().body(new MessageResponseDto("success"));
    }

    @GetMapping("/user/profile/image/{userId}")
    public ResponseEntity<UserImageResponseDto> getUserProfileImage(@PathVariable String userId) {
        String imageUrl = userService.getUserProfileImageUrl(userId);

        return ResponseEntity.ok().body(new UserImageResponseDto(imageUrl));
    }
}