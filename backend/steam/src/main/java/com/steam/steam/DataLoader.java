package com.steam.steam;

import com.steam.steam.user.Region;
import com.steam.steam.user.User;
import com.steam.steam.user.UserRepository;
import com.steam.steam.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    @Autowired
    public DataLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        // 초기 데이터를 생성하고 저장하는 코드
        User admin = new User("admin", "admin", "admin", "서울");
        // 데이터 설정
        userRepository.save(admin);
    }
}
