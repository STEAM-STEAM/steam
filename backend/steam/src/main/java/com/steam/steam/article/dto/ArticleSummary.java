package com.steam.steam.article.dto;

public record ArticleSummary(
        Long articleId,
        String title,
        Integer price,
        String userNickname
) {}