package com.steam.steam.article;

import com.steam.steam.user.Region;
import com.steam.steam.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findAllByOrderByCreatedTimeDesc();
    List<Article> findByRegionOrderByCreatedTimeDesc(Region region);
    List<Article> findByRegionAndContentContainingAndPriceBetweenOrderByCreatedTimeDesc
            (Region region, String keyword, Integer minPrice, Integer maxPrice);

    List<Article> findByUser(User user);
}