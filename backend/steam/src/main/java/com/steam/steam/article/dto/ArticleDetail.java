package com.steam.steam.article.dto;

import java.util.List;

public record ArticleDetail(
        String title,
        String content,
        Integer price,
        String sellerNickname,
        String sellerId,
        List<String> imgLinkUrl,
        Integer heartCount
) {}
