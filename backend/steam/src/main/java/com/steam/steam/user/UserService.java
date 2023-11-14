package com.steam.steam.user;

import com.steam.steam.user.dto.LoginDto;
import com.steam.steam.user.dto.UserDto;
import com.steam.steam.user.exception.PasswordValidationException;
import com.steam.steam.user.exception.UserAlreadyExistsException;
import com.steam.steam.user.exception.UserIdNotExistsException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void join(UserDto userDto) throws UserAlreadyExistsException, PasswordValidationException, IllegalArgumentException {
        User user = UserMapper.toEntity(userDto);

        if (userRepository.findById(user.getUserId()).isPresent()) {
            throw new UserAlreadyExistsException("[ERROR] 회원가입 아이디 중복");
        }
        // 지금 사용하지 않을 임의 기준
        if (user.getPw().length() < 1) {
            throw new PasswordValidationException("[ERROR] 회원가입 비밀번호 형식 불일치");
        }
        userRepository.save(user);
    }

    public void login(LoginDto loginDto) throws UserIdNotExistsException, PasswordValidationException {
        Optional<User> optionalUser = userRepository.findById(loginDto.userId());

        if (optionalUser.isEmpty()) {
            throw new UserIdNotExistsException("[ERROR] 로그인시 존재하지 않는 아이디");
        }
        User existingUser = optionalUser.get();
        if (!loginDto.pw().equals(existingUser.getPw())) {
            throw new PasswordValidationException("[ERROR] 로그인시 비밀번호 틀림");
        }
    }
}

