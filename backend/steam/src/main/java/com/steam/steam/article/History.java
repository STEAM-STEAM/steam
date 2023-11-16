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
public class History {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purchaser_id")
    private User purchaser;

    private String title;

    private String content;

    private Integer price;

    private LocalDateTime purchasedTime;

    private String imgDir;

    @Enumerated(EnumType.STRING)
    private Region region;
    private Integer heartCount;

    public History(User seller, User purchaser, String title, String content, Integer price, LocalDateTime purchasedTime, String imgDir, Region region, Integer heartCount) {
        this.seller = seller;
        this.purchaser = purchaser;
        this.title = title;
        this.content = content;
        this.price = price;
        this.purchasedTime = purchasedTime;
        this.imgDir = imgDir;
        this.region = region;
        this.heartCount = heartCount;
    }
}
