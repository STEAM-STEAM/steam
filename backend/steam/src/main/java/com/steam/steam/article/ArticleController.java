package com.steam.steam.article;

import com.steam.steam.article.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ArticleController {
    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping("/article")
    public ResponseEntity<Object> createArticle(@RequestBody ArticleRequestDto requestDto) {
        articleService.createArticle(requestDto);
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

    @GetMapping("/article/search")
    public ResponseEntity<List<ArticleSummary>> searchEntities(@RequestBody SearchRequestDto requestDto) {
        List<ArticleSummary> articles = articleService.getRecentArticlesOnSearch(requestDto);
        return ResponseEntity.ok().body(articles);
    }

    @PostMapping("/article/heart")
    public ResponseEntity determineHeartCount(@RequestBody HeartRequestDto heartRequestDto){
        String like = articleService.changeHeartCount(heartRequestDto);
        return new ResponseEntity<>(like, HttpStatus.OK);
    }
}