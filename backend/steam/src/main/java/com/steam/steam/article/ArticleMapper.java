package com.steam.steam.article;

import com.steam.steam.article.dto.ArticleDetail;
import com.steam.steam.article.dto.ArticleRequestDto;
import com.steam.steam.user.User;
import com.steam.steam.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
        return new ArticleDetail(
                article.getTitle(), article.getContent(), article.getPrice(),
                article.getUser().getNickname(), article.getUser().getUserId());
    }
}
