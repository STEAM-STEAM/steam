package com.steam.steam.user.dto;

import lombok.Getter;

@Getter
public record LoginDto(String userId, String pw) {
}
