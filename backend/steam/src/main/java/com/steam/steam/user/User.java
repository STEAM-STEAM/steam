package com.steam.steam.user;

import jakarta.persistence.Column;
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
    @Column(name = "user_id")
    private String id;

    private String pw;
    private Region region;
    private String nickname;
    private String profileImgUrl;

    public User(String id, String pw, String nickname, String region) throws IllegalArgumentException {
        this.id = id;
        this.nickname = nickname;
        this.region = Region.valueOf(region);
        this.pw = pw;
    }
}