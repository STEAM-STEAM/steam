package com.steam.steam.comment;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CommentRepository {
    private final EntityManager em;
    public List<Comment> findAllById(String articleId) {
        TypedQuery<Comment> query = em.createQuery(
                "select c from Comment c " +
                        "where c.article_id = :article_id",
                Comment.class
        );

        query.setParameter("article_id", articleId);

        return query.getResultList();
    }
}
