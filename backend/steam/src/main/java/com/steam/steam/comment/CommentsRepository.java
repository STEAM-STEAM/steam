package com.steam.steam.comment;

import com.steam.steam.article.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentsRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllById(Long commentId);
    List<Comment> findAllByArticle(Article article);
}
