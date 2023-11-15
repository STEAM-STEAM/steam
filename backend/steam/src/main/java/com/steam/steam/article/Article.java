package com.steam.steam.article;

import com.steam.steam.user.Region;
import com.steam.steam.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    private Integer price;

    private LocalDateTime createdTime;

    @ManyToOne
    private User user;

    private String imgUrl;

    @Enumerated(EnumType.STRING)
    private Region region;
    private Integer heartCount;

    public Article(String title, String content, Integer price, User user) {
        this.title = title;
        this.content = content;
        this.price = price;
        this.user = user;
        this.region = user.getRegion();
        this.createdTime = LocalDateTime.now();
        this.imgUrl = "example";
        this.heartCount = 0;
    }

    public Integer incrementHeartCount(){
        return this.heartCount++;
    }

    public Integer decrementHeartCount(){
        return this.heartCount--;
    }

    public void setImgUrl(String url) {
        this.imgUrl = url;
    }
}
