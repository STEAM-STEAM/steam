package com.steam.steam.article;

import com.steam.steam.user.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findAllByOrderByTimeDesc();
    List<Article> findByRegionOrderByTimeDesc(Region region);
}