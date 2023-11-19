package com.steam.steam.user;

import com.steam.steam.FileStorageService;
import com.steam.steam.user.dto.*;
import com.steam.steam.user.exception.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

import static com.steam.steam.user.KeywordMapper.toKeywordResponseDto;

@Service
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final KeywordRepository keywordRepository;
    private final FileStorageService fileStorageService;

    private static final Path userImageDir = Path.of("./images/user/");


    @Autowired
    public UserService(UserRepository userRepository, KeywordRepository keywordRepository, FileStorageService fileStorageService) {
        this.userRepository = userRepository;
        this.keywordRepository = keywordRepository;
        this.fileStorageService = fileStorageService;
    }

    @Transactional
    public void join(UserRequestDto userDto, MultipartFile image) throws UserAlreadyExistsException, PasswordValidationException, IllegalArgumentException, UserIdValidationException {
        User user = UserMapper.toEntity(userDto);

        if (userRepository.findById(user.getId()).isPresent()) {
            throw new UserAlreadyExistsException("[ERROR] 회원가입 아이디 중복");
        }

        userRepository.save(user);
        if(!image.isEmpty()){
            uploadProfileImage(user.getId(), image);
        }
        if (user.getId().length() < 8) {
            throw new UserIdValidationException("[ERROR] 회원가입 아이디 형식 아님");
        }
        if (user.getPw().length() < 8) {
            throw new PasswordValidationException("[ERROR] 회원가입 비밀번호 형식 아님");
        }
    }

    public void login(LoginRequestDto loginDto) throws UserIdNotExistsException, PasswordValidationException, BlacklistedUserException {
        Optional<User> optionalUser = userRepository.findById(loginDto.userId());
        if (optionalUser.isEmpty()) {
            throw new UserIdNotExistsException("[ERROR] 로그인시 존재하지 않는 아이디");
        }
        User existingUser = optionalUser.get();
        if (existingUser.isBlacklisted()) {
            throw new BlacklistedUserException("[Error] 블랙리스트 유저: 로그인 불가");
        }
        if (!loginDto.pw().equals(existingUser.getPw())) {
            throw new PasswordValidationException("[ERROR] 로그인시 비밀번호 틀림");
        }
    }

    @Transactional
    public void uploadProfileImage(String userId, MultipartFile image) {
        Path filePath = userImageDir.resolve(userId).resolve("profile.jpg");
        fileStorageService.storeImage(image, filePath);
        User user = userRepository.getReferenceById(userId);
        user.setProfileImgUrl(filePath);
        userRepository.save(user);
    }

    public UserResponseDto getUserInfo(String userId) {
        User user = userRepository.getReferenceById(userId);
        return UserMapper.toResponseDto(user);
    }

    public KeywordResponseDto getKeywordsOfUser(String userId) {
        User user = userRepository.getReferenceById(userId);
        List<Keyword> keywordsOfUser = keywordRepository.findByUser(user);
        return toKeywordResponseDto(user, keywordsOfUser);
    }

    @Transactional
    public String addKeywordOfUser(KeywordRequestDto keywordRequestDto) {
        User user = userRepository.getReferenceById(keywordRequestDto.userId());
        if(checkIfUserHasAKeyword(user, keywordRequestDto.keyword())){
            return "already exist";
        }
        Keyword keyword = new Keyword(user, keywordRequestDto.keyword());
        keywordRepository.save(keyword);
        return "success";
    }

    private boolean checkIfUserHasAKeyword(User user, String keyword) {
        List<Keyword> keywords = keywordRepository.findByUser(user);
        for (Keyword candidateKeyword : keywords) {
            if(candidateKeyword.getKeyword().equals(keyword))
                return true;
        }
        return false;
    }

    @Transactional
    public void deleteKeywordOfUser(KeywordRequestDto keywordRequestDto) {
        User user = userRepository.getReferenceById(keywordRequestDto.userId());
        keywordRepository.deleteByUserAndKeyword(user, keywordRequestDto.keyword());
    }

    public Path getProfileUrl(String userId) {
        User user = userRepository.getReferenceById(userId);
        return Path.of(user.getProfileImgUrl());
    }
}

