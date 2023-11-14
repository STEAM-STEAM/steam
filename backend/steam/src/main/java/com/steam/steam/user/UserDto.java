package com.steam.steam.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserDto {
    private String userId;
    private String pw;
    private String region;
    private String nickname;

    public UserDto(String userId, String pw, String nickname, Region region) {
        this.userId = userId;
        this.pw = pw;
        this.nickname = nickname;
        this.region = region.toString();
    }
}