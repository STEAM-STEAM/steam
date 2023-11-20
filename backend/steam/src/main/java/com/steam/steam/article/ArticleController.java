package com.steam.steam.article;

import com.steam.steam.article.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class ArticleController {
    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @Transactional
    @PostMapping("/article")
    public ResponseEntity<Object> createArticle(
            @RequestParam("userId") String userId,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("price") Integer price,
            @RequestParam("image") List<MultipartFile> images) throws IOException {

        ArticleRequestDto requestDto = ArticleRequestDto.builder()
                                                    .userId(userId)
                                                    .title(title)
                                                    .content(content)
                                                    .price(price)
                                                    .build();
//        List<MultipartFile> images = Arrays.stream(image).toList();
        articleService.createArticle(requestDto, images);

        return ResponseEntity.ok().body(new MessageResponseDto("success"));
    }


    @GetMapping("/articles/recent")
    public ResponseEntity<List<ArticleSummary>> getRecentArticles() {
        List<ArticleSummary> articles = articleService.getRecentArticles();
        return ResponseEntity.ok().body(articles);
    }

    @GetMapping("/articles/recent/{region}")
    public ResponseEntity<List<ArticleSummary>> getRecentArticlesByRegion(@PathVariable String region) {
        List<ArticleSummary> articles = articleService.getRecentArticlesByRegion(region);
        return ResponseEntity.ok().body(articles);
    }

    @GetMapping("/article/{article_id}")
    public ResponseEntity<ArticleDetail> getArticleById(@PathVariable Long article_id) {
        ArticleDetail article = articleService.getArticleDetail(article_id);
        return ResponseEntity.ok().body(article);
    }

    @GetMapping("/article/heart/{article_id}/{user_id}")
    public ResponseEntity<Object> getHeartStatusById(@PathVariable Long article_id, @PathVariable String user_id) {
        String message = articleService.getHeartStatusDetail(article_id, user_id);
        return ResponseEntity.ok().body(new MessageResponseDto(message));
    }

    @GetMapping("/article/purchaseRequest/{article_id}/{user_id}")
    public ResponseEntity<Object> getPurchaseRequestStatusById(@PathVariable Long article_id, @PathVariable String user_id) {
        String message = articleService.getPurchaseRequestStatusDetail(article_id, user_id);
        return ResponseEntity.ok().body(new MessageResponseDto(message));
    }

    @GetMapping("/article/search")
    public ResponseEntity<List<ArticleSummary>> searchEntities(
            @RequestParam("region") String region,
            @RequestParam("keyword") String keyword,
            @RequestParam("minPrice") Integer minPrice,
            @RequestParam("maxPrice") Integer maxPrice) {
        SearchRequestDto requestDto = new SearchRequestDto(region, keyword, minPrice, maxPrice);
        List<ArticleSummary> articles = articleService.getRecentArticlesOnSearch(requestDto);
        return ResponseEntity.ok().body(articles);
    }

    @PostMapping("/article/heart")
    public ResponseEntity determineHeartCount(@RequestBody HeartRequestDto heartRequestDto){
        String like = articleService.changeHeartCount(heartRequestDto);
        return new ResponseEntity<>(like, HttpStatus.OK);
    }

    @PostMapping("/article/purchase/request")
    public ResponseEntity determinePurchase(@RequestBody PurchaseRequestDto purchaseRequestDto){
        String purchase = articleService.changePurchaseStatus(purchaseRequestDto);
        return new ResponseEntity<>(purchase, HttpStatus.OK);
    }

    @GetMapping("/article/purchase/request/{articleId}")
    public ResponseEntity<List<PurchaseRequestResponse>> getPurchaseRequests(@PathVariable Long articleId) {
        List<PurchaseRequestResponse> purchaseRequests = articleService.getPurchaseRequests(articleId);
        return ResponseEntity.ok().body(purchaseRequests);
    }

    @PostMapping("/article/purchase/confirm")
    public ResponseEntity purchaseConfirm(@RequestBody PurchaseConfirm purchaseConfirm){
        articleService.purchaseConfirm(purchaseConfirm);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @GetMapping("/article/heart/{userId}")
    public ResponseEntity<List<ArticleSummary>> getArticlesByHeartOfUser(@PathVariable String userId) {
        List<ArticleSummary> articles = articleService.getArticlesByHeartOfUser(userId);
        return ResponseEntity.ok().body(articles);
    }

    @GetMapping("/article/history/sell/{userId}")
    public ResponseEntity<List<ArticleSummary>> getHistoryOfSellByUser(@PathVariable String userId) {
        List<ArticleSummary> articles = articleService.getHistoryOfSellByUser(userId);
        return ResponseEntity.ok().body(articles);
    }

    @GetMapping("/article/sell/{userId}")
    public ResponseEntity<List<ArticleSummary>> getArticlesOfSellByUser(@PathVariable String userId) {
        List<ArticleSummary> articles = articleService.getArticlesOfSellByUser(userId);
        return ResponseEntity.ok().body(articles);
    }

    @GetMapping("/article/history/purchase/{userId}")
    public ResponseEntity<List<ArticleSummary>> getHistoryOfPurchaseByUser(@PathVariable String userId) {
        List<ArticleSummary> articles = articleService.getHistoryOfPurchaseByUser(userId);
        return ResponseEntity.ok().body(articles);
    }

    @GetMapping("/article/purchase/{userId}")
    public ResponseEntity<List<ArticleSummary>> getArticlesOfPurchaseByUser(@PathVariable String userId) {
        List<ArticleSummary> articles = articleService.getArticlesOfPurchaseByUser(userId);
        return ResponseEntity.ok().body(articles);
    }

}