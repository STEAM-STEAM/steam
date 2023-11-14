package com.steam.steam.comment;

import com.steam.steam.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentResponseDto {
    private String userId;
    private String userNickname;
    private String userProfileImgUrl;
    private String content;
    private LocalDateTime createTime;


    public static CommentResponseDto of(Comment comment) {
        User writer = comment.getUser();
        return new CommentResponseDto(writer.getId(), writer.getNickname(), writer.getProfileImgUrl(),
                comment.getContent(), comment.getCreateTime());
    }
}
