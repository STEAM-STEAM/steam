package com.steam.steam.article;

import com.steam.steam.article.dto.*;
import com.steam.steam.user.Region;
import com.steam.steam.user.User;
import com.steam.steam.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;
    private final UserRepository userRepository;
    private final HeartRepository heartRepository;
    private final PurchaseRequestRepository purchaseRequestRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository, ArticleMapper articleMapper, UserRepository userRepository,
                          HeartRepository heartRepository, PurchaseRequestRepository purchaseRequestRepository) {
        this.articleRepository = articleRepository;
        this.articleMapper = articleMapper;
        this.userRepository = userRepository;
        this.heartRepository = heartRepository;
        this.purchaseRequestRepository = purchaseRequestRepository;
    }

    public void createArticle(ArticleRequestDto articleDto) {
        Article article = articleMapper.toEntity(articleDto);
        articleRepository.save(article);
    }

    public List<ArticleSummary> getRecentArticles() {
        List<Article> articles = articleRepository.findAllByOrderByCreatedTimeDesc();
        return toArticleSummaries(articles);
    }


    public List<ArticleSummary> getRecentArticlesByRegion(String region) {
        List<Article> articles = articleRepository.findByRegionOrderByCreatedTimeDesc(Region.valueOf(region));
        return toArticleSummaries(articles);
    }

    private static List<ArticleSummary> toArticleSummaries(List<Article> articles) {
        List<ArticleSummary> articleSummary = new ArrayList<>();
        for (Article article : articles) {
            articleSummary.add(new ArticleSummary(
                    article.getId(),
                    article.getTitle(),
                    article.getPrice(),
                    article.getUser().getNickname(),
                    article.getImgUrl()
            ));
        }
        return articleSummary;
    }

    public ArticleDetail getArticleDetail(Long articleId) {
        Article article = articleRepository.getReferenceById(articleId);
        return articleMapper.toArticleDetail(article);
    }

    public List<ArticleSummary> getRecentArticlesOnSearch(SearchRequestDto requestDto) {
        List<Article> articles = articleRepository.findByRegionAndContentContainingAndPriceBetweenOrderByCreatedTimeDesc(
                Region.valueOf(requestDto.region()), requestDto.keyword(), requestDto.minPrice(), requestDto.maxPrice()
        );

        return toArticleSummaries(articles);
    }

    @Transactional
    public String changeHeartCount(HeartRequestDto heartRequestDto) {
        String userId = heartRequestDto.userId();
        Long articleId = heartRequestDto.articleId();

        User user = userRepository.findById(userId).get();
        Article article = articleRepository.findById(articleId).get();

        List<Heart> byUserAndArticle = heartRepository.findByUserAndArticle(user, article);
        if(byUserAndArticle.size() > 0){
            decrementHeartCount(user, article);
            return "decrement";
        }else{
            incrementHeartCount(user, article);
            return "increment";
        }
    }

    private void decrementHeartCount(User user, Article article) {
        article.decrementHeartCount();
        heartRepository.deleteByUserAndArticle(user, article);
    }

    private void incrementHeartCount(User user, Article article) {
        article.incrementHeartCount();

        Heart heart = new Heart(user, article);
        heartRepository.save(heart);
    }

    @Transactional
    public String changePurchaseStatus(PurchaseRequestDto purchaseRequestDto) {
        String userId = purchaseRequestDto.userId();
        Long articleId = purchaseRequestDto.articleId();

        User user = userRepository.findById(userId).get();
        Article article = articleRepository.findById(articleId).get();

        List<PurchaseRequest> byUserAndArticle = purchaseRequestRepository.findByUserAndArticle(user, article);
        if(byUserAndArticle.size() > 0){
            purchaseRequestRepository.deleteByUserAndArticle(user, article);
            return "purchase request cancel";
        }else{
            PurchaseRequest purchaseRequest = new PurchaseRequest(user, article);
            purchaseRequestRepository.save(purchaseRequest);
            return "purchase request success";
        }
    }

    public List<PurchaseRequestResponse> getPurchaseRequests(Long articleId) {
        Article article = articleRepository.findById(articleId).get();
        List<PurchaseRequest> purchaseRequests = purchaseRequestRepository.findByArticle(article);

        return toPurchaseRequestResponse(purchaseRequests);
    }

    private static List<PurchaseRequestResponse> toPurchaseRequestResponse(List<PurchaseRequest> purchaseRequests) {
        List<PurchaseRequestResponse> purchaseRequestResponses = new ArrayList<>();
        for (PurchaseRequest purchaseRequest : purchaseRequests) {
            purchaseRequestResponses.add(new PurchaseRequestResponse(
                    purchaseRequest.getUser().getId(),
                    purchaseRequest.getUser().getNickname()
            ));
        }
        return purchaseRequestResponses;
    }

    public void purchaseConfirm(PurchaseConfirm purchaseConfirm) {

    }
}
