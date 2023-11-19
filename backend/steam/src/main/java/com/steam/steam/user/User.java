package com.steam.steam.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.nio.file.Path;

@Entity
@Getter
@RequiredArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @Column(name = "user_id")
    private String id;

    private String pw;
    @Enumerated(EnumType.STRING)
    private Region region;
    private String nickname;
    private String profileImgUrl;
    private boolean blacklisted;


    public User(String id, String pw, String nickname, String region) throws IllegalArgumentException {
        this.id = id;
        this.nickname = nickname;
        this.region = Region.valueOf(region);
        this.pw = pw;
    }

    public void setProfileImgUrl(Path path) {
        this.profileImgUrl = path.toString();
    }

    public void setBlacklisted(boolean blacklisted) {
        this.blacklisted = blacklisted;
    }

    public boolean isBlacklisted() {
        return blacklisted;
    }
}