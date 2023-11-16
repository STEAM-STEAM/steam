package com.steam.steam.user;

import com.steam.steam.FileStorageService;
import com.steam.steam.user.dto.*;
import com.steam.steam.user.exception.PasswordValidationException;
import com.steam.steam.user.exception.UserAlreadyExistsException;
import com.steam.steam.user.exception.UserIdNotExistsException;
import com.steam.steam.user.exception.UserIdValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;

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
//
//    @GetMapping("/user/profile/image/{userId}")
//    public ResponseEntity<UserImageResponseDto> getUserProfileImage(@PathVariable String userId) {
//        String imageUrl = userService.getUserProfileImageUrl(userId);
//
//        return ResponseEntity.ok().body(new UserImageResponseDto(imageUrl));
//    }

    @GetMapping("/user/info/{userId}")
    public ResponseEntity<UserResponseDto> getUserInfo(@PathVariable String userId){
        UserResponseDto userInfo = userService.getUserInfo(userId);
        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }

    @GetMapping("/user/keyword/{userId}")
    public ResponseEntity<KeywordResponseDto> getKeywordOfUser(@PathVariable String userId){
        KeywordResponseDto keywords = userService.getKeywordsOfUser(userId);
        return new ResponseEntity<>(keywords, HttpStatus.OK);
    }

    @PostMapping("/user/keyword")
    public ResponseEntity<MessageResponseDto> addKeywordOfUser(@RequestBody KeywordRequestDto keywordRequestDto){
        String message = userService.addKeywordOfUser(keywordRequestDto);
        return ResponseEntity.ok().body(new MessageResponseDto(message));
    }

    @DeleteMapping("/user/keyword")
    public ResponseEntity<MessageResponseDto> deleteKeywordOfUser(@RequestBody KeywordRequestDto keywordRequestDto){
        userService.deleteKeywordOfUser(keywordRequestDto);
        return ResponseEntity.ok().body(new MessageResponseDto("success"));
    }
}