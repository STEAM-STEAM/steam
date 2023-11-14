package com.steam.steam.article;

import com.steam.steam.article.dto.ArticleDetail;
import com.steam.steam.article.dto.ArticleRequestDto;
import com.steam.steam.article.dto.ArticleSummary;
import com.steam.steam.article.dto.MessageResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ArticleController {
    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping("/article")
    public ResponseEntity<Object> createArticle(@RequestBody ArticleRequestDto requestDto) {
        try {
            articleService.createArticle(requestDto);
        } catch (MalformedURLException e) {
            return ResponseEntity.ok().body(new MessageResponseDto("image_url_error"));
        }
        return ResponseEntity.ok().body(new MessageResponseDto("success"));
    }


    @GetMapping("/recent")
    public ResponseEntity<List<ArticleSummary>> getRecentArticles() {
        List<ArticleSummary> articles = articleService.getRecentArticles();
        return ResponseEntity.ok().body(articles);
    }

    @GetMapping("/recent/{region}")
    public ResponseEntity<List<ArticleSummary>> getRecentArticlesByRegion(@PathVariable String region) {
        List<ArticleSummary> articles = articleService.getRecentArticlesByRegion(region);
        return ResponseEntity.ok().body(articles);
    }

    @GetMapping("/article/{article_id}")
    public ResponseEntity<ArticleDetail> getArticleById(@PathVariable Long article_id) {
        ArticleDetail article = articleService.getArticleDetail(article_id);
        return ResponseEntity.ok().body(article);
    }
}