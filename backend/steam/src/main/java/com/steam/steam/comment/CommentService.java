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
    private final CommentsRepository commentRepository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;

    @Transactional
    public void write(CommentRequestDto commentRequestDto) {
        User writer = userRepository.findById(commentRequestDto.getUserId()).get();
        Article article = articleRepository.findById(commentRequestDto.getArticleId()).get();
        LocalDateTime createTime = LocalDateTime.now();

        Comment comment = new Comment();
        comment.setUser(writer);
        comment.setContent(commentRequestDto.getContent());
        comment.setCreateTime(createTime);
        comment.setArticle(article);

        commentRepository.save(comment);
    }

    public List<Comment> getAllComment(Long articleId) {
        return commentRepository.findAllById(articleId);
    }
}
