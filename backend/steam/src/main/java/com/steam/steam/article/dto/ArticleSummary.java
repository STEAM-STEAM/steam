package com.steam.steam.article.dto;

import java.net.URL;

public record ArticleSummary(
        Long articleId,
        String title,
        Integer price,
        String userNickname,
        String imgLinkUrl
) {}