package com.steam.steam.article;

import com.steam.steam.comment.Comment;
import com.steam.steam.user.Region;
import com.steam.steam.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Article {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long id;

    private String title;

    private String content;

    private Integer price;

    private LocalDateTime createdTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    private String imgDir;

    @Enumerated(EnumType.STRING)
    private Region region;
    private Integer heartCount;
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<Heart> hearts = new ArrayList<>();

    public Article(String title, String content, Integer price, User user) {
        this.title = title;
        this.content = content;
        this.price = price;
        this.user = user;
        this.region = user.getRegion();
        this.createdTime = LocalDateTime.now();
        this.imgDir = "example";
        this.heartCount = 0;
    }

    public Integer incrementHeartCount(){
        return this.heartCount++;
    }

    public Integer decrementHeartCount(){
        return this.heartCount--;
    }

    public void setImgDir(Path url) {
        this.imgDir = url.toString();
    }

}
