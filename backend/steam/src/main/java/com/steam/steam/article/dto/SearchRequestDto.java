package com.steam.steam.article.dto;

public record SearchRequestDto(String region, String keyword, Integer minPrice, Integer maxPrice) {
}
