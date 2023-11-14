package com.steam.steam.article.dto;

public record ArticleDetail(
        String title,
        String content,
        Integer price,
        String sellerNickname,
        String sellerId
) {}
