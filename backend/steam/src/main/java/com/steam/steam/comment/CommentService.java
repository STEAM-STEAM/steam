package com.steam.steam.comment;

import com.steam.steam.article.Article;
import com.steam.steam.article.ArticleRepository;
import com.steam.steam.user.User;
import com.steam.steam.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public List<Comment> getAllComment(String articleId) {
        return commentRepository.findAllById(articleId);
    }
}
