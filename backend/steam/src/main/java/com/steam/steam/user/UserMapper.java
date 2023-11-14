package com.steam.steam.user;

import com.steam.steam.user.dto.UserRequestDto;

public class UserMapper {

    public static User toEntity(UserRequestDto userDto) {
        return new User(userDto.getUserId(), userDto.getPw(), userDto.getNickname(), userDto.getRegion());
    }

    public static UserRequestDto toDto(User user) {
        return new UserRequestDto(user.getUserId(), user.getPw(), user.getNickname(), user.getRegion());
    }
}
