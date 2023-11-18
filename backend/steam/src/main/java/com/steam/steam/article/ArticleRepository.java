package com.steam.steam.article;

import com.steam.steam.user.Region;
import com.steam.steam.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByHideFalseOrderByCreatedTimeDesc();

    @Query("SELECT a FROM Article a WHERE a.region = :region AND a.hide = false ORDER BY a.createdTime DESC")
    List<Article> findVisibleByRegionOrderByCreatedTimeDesc(Region region);

    @Query("SELECT a FROM Article a WHERE a.region = :region AND a.content LIKE %:keyword% " +
            "AND a.price BETWEEN :minPrice AND :maxPrice AND a.hide = false ORDER BY a.createdTime DESC")
    List<Article> findByRegionAndContentContainingAndPriceBetweenOrderByCreatedTimeDesc
            (Region region, String keyword, Integer minPrice, Integer maxPrice);

    List<Article> findByUser(User user);

    List<Article> findByHide(boolean isHidden);
}