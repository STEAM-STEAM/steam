package com.steam.steam.article.dto;

public record ArticleRequestDto(String userId, String title, String content, Integer price) {
}
