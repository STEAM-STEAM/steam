package com.steam.steam.article;

import com.steam.steam.user.Region;
import com.steam.steam.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.net.MalformedURLException;
import java.net.URL;
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

    private LocalDateTime time;

    @ManyToOne
    private User user;

    private URL imgUrl;

    private Region region;

    public Article(String title, String content, Integer price, User user) throws MalformedURLException {
        this.title = title;
        this.content = content;
        this.price = price;
        this.user = user;
        this.region = user.getRegion();
        this.time = LocalDateTime.now();
        this.imgUrl = new URL("example");
    }
}
