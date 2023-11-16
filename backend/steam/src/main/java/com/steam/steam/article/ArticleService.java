package com.steam.steam.article;

import com.steam.steam.FileStorageService;
import com.steam.steam.article.dto.*;
import com.steam.steam.user.Region;
import com.steam.steam.user.User;
import com.steam.steam.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;
    private final UserRepository userRepository;
    private final HeartRepository heartRepository;
    private final PurchaseRequestRepository purchaseRequestRepository;
    private final HistoryRepository historyRepository;

    private static final Path articleImageDir = Path.of("./src/main/java/com/steam/steam/article/pic/");
    private final FileStorageService fileStorageService;

    @Autowired
    public ArticleService(ArticleRepository articleRepository, ArticleMapper articleMapper,
                          UserRepository userRepository, HeartRepository heartRepository,
                          PurchaseRequestRepository purchaseRequestRepository, HistoryRepository historyRepository, FileStorageService fileStorageService) {
        this.articleRepository = articleRepository;
        this.articleMapper = articleMapper;
        this.userRepository = userRepository;
        this.heartRepository = heartRepository;
        this.purchaseRequestRepository = purchaseRequestRepository;
        this.historyRepository = historyRepository;
        this.fileStorageService = fileStorageService;
    }

    public Long createArticle(ArticleRequestDto articleDto, List<MultipartFile> images) {
        Article article = articleMapper.toEntity(articleDto);
        articleRepository.save(article);
        Long id = article.getId();

        Path imageDir = articleImageDir.resolve(String.valueOf(id));
        List<Path> filePaths = new ArrayList<>();
        for(int i=0; i<images.size(); i++) {
            filePaths.add(imageDir.resolve(i + ".jpg"));
        }

        fileStorageService.storeImages(images, filePaths);
        filePaths.forEach(path -> article.setImgDir(imageDir));

        return id;
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
                    article.getImgDir() + "/0.jpg"
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

    @Transactional
    public void purchaseConfirm(PurchaseConfirm purchaseConfirm) {
        String userId = purchaseConfirm.userId();
        Long articleId = purchaseConfirm.articleId();

        User purchaser = userRepository.findById(userId).get();
        Article article = articleRepository.findById(articleId).get();
        User seller = article.getUser();

        List<PurchaseRequest> purchaseRequests = purchaseRequestRepository.findByArticle(article);

        purchaseRequests.forEach(purchaseRequest -> {
            if(purchaseRequest.getUser().equals(purchaser)){
                History history = new History(seller, article, purchaser);
                historyRepository.save(history);
            }
            purchaseRequestRepository.delete(purchaseRequest);
        });
    }

    public List<ArticleSummary> getArticlesByHeartOfUser(String userId) {
        User user = userRepository.getReferenceById(userId);
        List<Heart> hearts = heartRepository.findByUser(user);
        List<Article> articles = articleMapper.toArticleFromHearts(hearts);

        return articleMapper.toArticleSummaries(articles);
    }

    public List<ArticleSummary> getHistoryOfSellByUser(String userId) {
        User user = userRepository.getReferenceById(userId);
        List<History> historyOfSell = historyRepository.findBySeller(user);
        List<Article> articles = articleMapper.toArticleFromHistory(historyOfSell);
        return articleMapper.toArticleSummaries(articles);
    }

    public List<ArticleSummary> getArticlesOfSellByUser(String userId) {
        User user = userRepository.getReferenceById(userId);
        List<Article> articles = articleRepository.findByUser(user);
        return articleMapper.toArticleSummaries(articles);
    }
}
