package com.steam.steam.user;

public class UserMapper {

    public static User toEntity(UserDto userDto) {
        return new User(userDto.getUserId(), userDto.getPw(), userDto.getNickname(), userDto.getRegion());
    }

    public static UserDto toDto(User user) {
        return new UserDto(user.getUserId(), user.getPw(), user.getNickname(), user.getRegion());
    }
}
