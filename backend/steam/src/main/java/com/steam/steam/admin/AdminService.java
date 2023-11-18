package com.steam.steam.admin;

import com.steam.steam.user.User;
import com.steam.steam.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {
    private final UserRepository userRepository;

    @Autowired
    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserIdNicknameDto> getAllUserIdAndNickName() {
        List<User> users = userRepository.findAllNotBlacklisted();

        return users.stream()
                .filter(user -> !"admin".equals(user.getId()))
                .map(user -> new UserIdNicknameDto(user.getId(), user.getNickname()))
                .collect(Collectors.toList());
    }


    @Transactional
    public void setBlacklist(List<UserIdDto> users, boolean isBlacked) {
        for (UserIdDto userDto : users) {
            User user = userRepository.getReferenceById(userDto.userId());
            user.setBlacklisted(isBlacked);
            userRepository.save(user);
        }
    }

    public List<UserIdNicknameDto> getBlackList() {
        List<User> blacklist = userRepository.findByBlacklistedTrue();

        return blacklist.stream()
                .map(user -> new UserIdNicknameDto(user.getId(), user.getNickname()))
                .collect(Collectors.toList());
    }
}
