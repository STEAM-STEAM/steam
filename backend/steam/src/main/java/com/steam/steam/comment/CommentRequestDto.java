package com.steam.steam.comment;

import lombok.Getter;

@Getter
public class CommentRequestDto {
    private String userId;
    private String content;
    private Long articleId;
}
