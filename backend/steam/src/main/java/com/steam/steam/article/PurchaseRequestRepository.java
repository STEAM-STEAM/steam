package com.steam.steam.article;

import com.steam.steam.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseRequestRepository extends JpaRepository<PurchaseRequest, Long> {
    Long deleteByUserAndArticle(User user, Article article);
    List<PurchaseRequest> findByUserAndArticle(User user, Article article);
    List<PurchaseRequest> findByArticle(Article article);

    List<Article> findByUser(User user);
}
