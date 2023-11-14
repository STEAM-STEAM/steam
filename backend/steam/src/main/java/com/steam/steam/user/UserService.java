package com.steam.steam.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
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
}

