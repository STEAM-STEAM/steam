package com.steam.steam.article.dto;

import java.net.URL;

public record ArticleDetail(
        String title,
        String content,
        Integer price,
        String sellerNickname,
        String sellerId,
        String imgLinkUrl,
        Integer heartCount
) {}
