package com.steam.steam.article.dto;

import lombok.Builder;

@Builder
public record ArticleRequestDto(String userId, String title, String content, Integer price) {
}
