package com.steam.steam.user;

import com.steam.steam.user.dto.UserRequestDto;
import com.steam.steam.user.dto.UserResponseDto;

public class UserMapper {

    public static User toEntity(UserRequestDto userDto) {
        return new User(userDto.getUserId(), userDto.getPw(), userDto.getNickname(), userDto.getRegion());
    }

    public static UserRequestDto toDto(User user) {
        return new UserRequestDto(user.getId(), user.getPw(), user.getNickname(), user.getRegion());
    }

    public static UserResponseDto toResponseDto(User user){
        return new UserResponseDto(user.getId(), user.getNickname(), user.getRegion().toString(), user.getProfileImgUrl());
    }
}
