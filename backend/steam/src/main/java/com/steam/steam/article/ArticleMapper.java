package com.steam.steam.article;

import com.steam.steam.article.dto.ArticleDetail;
import com.steam.steam.article.dto.ArticleRequestDto;
import com.steam.steam.article.dto.ArticleSummary;
import com.steam.steam.user.User;
import com.steam.steam.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class ArticleMapper {
    private final UserRepository userRepository;

    @Autowired
    public ArticleMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Article toEntity(ArticleRequestDto articleDto) {
        User user = userRepository.getReferenceById(articleDto.userId());
        return new Article(articleDto.title(), articleDto.content(), articleDto.price(), user);
    }

    public ArticleDetail toArticleDetail(Article article) {

        String imgDir = article.getImgDir();
        List<String> imgUrls = findJpgFiles(Path.of(imgDir));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        return new ArticleDetail(
                article.getTitle(), article.getContent(), article.getPrice(),
                article.getUser().getNickname(), article.getUser().getId(),
                imgUrls, article.getHeartCount(), article.getCreatedTime().format(formatter));
    }

    private List<String> findJpgFiles(Path imgDir) {
        List<String> imgUrls = new ArrayList<>();
        try {
            List<Path> allFiles = Files.walk(imgDir)
                    .filter(Files::isRegularFile)
                    .toList();

            for (Path file : allFiles) {
                if (file.toString().toLowerCase().endsWith(".jpg")) {
                    imgUrls.add(file.toString());
                }
            }
        } catch (IOException e) { }
        return imgUrls;
    }

    public List<ArticleSummary> toArticleSummaries(List<Article> articles){
        List<ArticleSummary> articleSummaries = new ArrayList<>();
        articles.forEach(article -> {
            articleSummaries.add(new ArticleSummary(article.getId(), article.getTitle(),
                    article.getPrice(), article.getUser().getNickname(), article.getImgDir()));
        });

        return articleSummaries;
    }

    public List<Article> toArticleFromHearts(List<Heart> hearts) {
        List<Article> articles = new ArrayList<>();
        hearts.forEach(heart -> articles.add(heart.getArticle()));
        return articles;
    }

    public List<Article> toArticleFromHistory(List<History> historiesOfSell) {
        List<Article> articles = new ArrayList<>();
        historiesOfSell.forEach(history -> {
            articles.add(new Article(history.getTitle(), history.getContent(), history.getPrice(), history.getSeller()));
        });
        return articles;
    }

    public List<Article> toArticleFromPurchaseRequest(List<PurchaseRequest> purchaseRequests) {
        List<Article> articles = new ArrayList<>();
        purchaseRequests.forEach(purchaseRequest -> articles.add(purchaseRequest.getArticle()));
        return articles;
    }

    public History toHistory(Article article, User purchaser) {
        return new History(article.getUser(), purchaser, article.getTitle(), article.getContent(),
                article.getPrice(), LocalDateTime.now(), article.getImgDir(),
                article.getRegion(), article.getHeartCount());
    }
}