package com.steam.steam.user.dto;

import java.util.List;

public record KeywordResponseDto(String userId, List<String> keywords) {
}
