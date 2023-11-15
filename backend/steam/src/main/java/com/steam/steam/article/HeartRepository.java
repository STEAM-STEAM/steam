package com.steam.steam.article;

import com.steam.steam.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeartRepository extends JpaRepository<Heart, Long> {
    Long deleteByUserAndArticle(User user, Article article);
    List<Heart> findByUserAndArticle(User user, Article article);
}
