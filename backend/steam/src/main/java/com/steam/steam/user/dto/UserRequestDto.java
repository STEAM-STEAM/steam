package com.steam.steam.user.dto;

import com.steam.steam.user.Region;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserRequestDto {
    private String userId;
    private String pw;
    private String region;
    private String nickname;

    public UserRequestDto(String userId, String pw, String nickname, Region region) {
        this.userId = userId;
        this.pw = pw;
        this.nickname = nickname;
        this.region = region.toString();
    }
}