package com.steam.steam.article;

import com.steam.steam.article.dto.ArticleDetail;
import com.steam.steam.article.dto.ArticleRequestDto;
import com.steam.steam.article.dto.ArticleSummary;
import com.steam.steam.user.Region;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;

    @Autowired
    public ArticleService(ArticleRepository articleRepository, ArticleMapper articleMapper) {
        this.articleRepository = articleRepository;
        this.articleMapper = articleMapper;
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
}
