package com.steam.steam.user;

import com.steam.steam.user.dto.KeywordResponseDto;

import java.util.ArrayList;
import java.util.List;

public class KeywordMapper {
    public static KeywordResponseDto toKeywordResponseDto(User user, List<Keyword> keywords){
        List<String> keywordsOfUser = new ArrayList<>();
        keywords.forEach(keyword -> keywordsOfUser.add(keyword.getKeyword()));
        return new KeywordResponseDto(user.getId(), keywordsOfUser);
    }
}
