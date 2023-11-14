package com.steam.steam.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Entity
@Getter
@RequiredArgsConstructor
@Table(name = "users")
public class User {
    @Id
    private String userId;

    private String pw;
    private Region region;
    private String nickname;
    private String profilePicture;

    public User(String userId, String pw, String nickname, String region) throws IllegalArgumentException {
        this.userId = userId;
        this.nickname = nickname;
        this.region = Region.valueOf(region);
        this.pw = pw;
    }
}