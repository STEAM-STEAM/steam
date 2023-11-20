package com.steam.steam.comment;

import com.steam.steam.article.dto.ArticleDetail;
import com.steam.steam.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@AllArgsConstructor
public class CommentResponseDto {
    private String userId;
    private String userNickname;
    private String userProfileImgUrl;
    private String content;
    private String createTime;


    public static CommentResponseDto of(Comment comment) {
        User writer = comment.getUser();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        return new CommentResponseDto(writer.getId(), writer.getNickname(), writer.getProfileImgUrl(),
                comment.getContent(), comment.getCreateTime().format(formatter));
    }
}
