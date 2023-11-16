package com.steam.steam.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Entity
@Getter
@RequiredArgsConstructor
public class Keyword {
    @Id
    @Column(name = "keyword_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    private String keyword;

    public Keyword(User user, String keyword) {
        this.user = user;
        this.keyword = keyword;
    }
}
