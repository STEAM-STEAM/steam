package com.steam.steam.article.dto;

import org.springframework.web.multipart.MultipartFile;

public record ArticleRequestDto(String userId, String title, String content, Integer price, MultipartFile image) {
}
