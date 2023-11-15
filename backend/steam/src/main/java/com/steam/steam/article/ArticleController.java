package com.steam.steam.article;

import com.steam.steam.FileStorageService;
import com.steam.steam.article.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ArticleController {
    private final ArticleService articleService;
    private final FileStorageService fileStorageService;

    @Autowired
    public ArticleController(ArticleService articleService,
                             FileStorageService fileStorageService) {
        this.articleService = articleService;
        this.fileStorageService = fileStorageService;
    }

    @Transactional
    @PostMapping("/article")
    public ResponseEntity<Object> createArticle(
            @RequestParam("userId") String userId,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("price") Integer price,
            @RequestParam("image") MultipartFile image) {

        ArticleRequestDto requestDto = new ArticleRequestDto(userId, title, content, price, image);
        Long articleId = articleService.createArticle(requestDto);

        // 파일 저장 (사진 단 하나라고 가정)
        fileStorageService.storeFile(image, articleId);

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