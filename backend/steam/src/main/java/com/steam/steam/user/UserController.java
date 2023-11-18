package com.steam.steam.user;

import com.steam.steam.FileStorageService;
import com.steam.steam.user.dto.*;
import com.steam.steam.user.exception.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Path;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:3001")
public class UserController {
    private final UserService userService;
    private final FileStorageService fileStorageService;

    private static final Path userImageDir = Path.of("./src/main/java/com/steam/steam/user/pic/");


    @Autowired
    public UserController(UserService userService, FileStorageService fileStorageService) {
        this.userService = userService;
        this.fileStorageService = fileStorageService;
    }

    @ApiResponse(responseCode = "")
    @Operation(summary = "회원가입", description = "유저 회원가입")
    @PostMapping("/join")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200 OK", description = "회원가입 성공", content = @Content(schema = @Schema(implementation = MessageResponseDto.class))),
            @ApiResponse(responseCode = "200 id_error", description = "중복된 id 존재", content = @Content(schema = @Schema(implementation = MessageResponseDto.class))),
            @ApiResponse(responseCode = "200 pw_error", description = "비밀번호 8자리 이하", content = @Content(schema = @Schema(implementation = MessageResponseDto.class)))
    })
    public ResponseEntity<MessageResponseDto> joinUser(
            @Parameter(description = "유저 아이디", required = true, example = "abcd1234") @RequestParam("userId") String userId,
            @Parameter(description = "유저 비밀번호", required = true, example = "abcd1234")@RequestParam("pw") String pw,
            @Parameter(description = "유저 거주 지역", required = true, example = "대전") @RequestParam("region") String region,
            @Parameter(description = "유저 닉네임", required = true, example = "steam")@RequestParam("nickname") String nickname,
            @Parameter(description = "유저 프로필 사진", required = true)@RequestParam("image") MultipartFile image) {
        try {
            Path filePath = userImageDir.resolve(userId).resolve("profile.jpg");
            UserRequestDto userDto = new UserRequestDto(userId, pw, nickname, Region.valueOf(region));
            userService.join(userDto, image, filePath);
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
        } catch (BlacklistedUserException e) {
            return ResponseEntity.ok().body(new MessageResponseDto("blacklist"));
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