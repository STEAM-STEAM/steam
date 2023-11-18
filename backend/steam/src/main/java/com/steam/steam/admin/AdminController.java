package com.steam.steam.admin;


import com.steam.steam.article.ArticleService;
import com.steam.steam.article.dto.MessageResponseDto;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin")
public class AdminController {
    private final AdminService adminService;
    private final ArticleService articleService;

    public AdminController(AdminService adminService, ArticleService articleService) {
        this.adminService = adminService;
        this.articleService = articleService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserIdNicknameDto>> getAllUserIdAndNickName() {
        return ResponseEntity.ok().body(adminService.getAllUserIdAndNickName());
    }

    @GetMapping("/blacklist")
    public ResponseEntity<List<UserIdNicknameDto>> getBlackList() {
        return ResponseEntity.ok().body(adminService.getBlackList());
    }

    @PostMapping("/blacklist/add")
    @Transactional
    public ResponseEntity<MessageResponseDto> addToBlacklist(@RequestBody List<UserIdDto> users) {
        adminService.setBlacklist(users, true);
        articleService.deleteArticles(users);
        return ResponseEntity.ok().body(new MessageResponseDto("success"));
    }

    @PostMapping("/blacklist/remove")
    @Transactional
    public ResponseEntity<MessageResponseDto> removeBlacklist(@RequestBody List<UserIdDto> users) {
        adminService.setBlacklist(users, false);
        return ResponseEntity.ok().body(new MessageResponseDto("success"));
    }
}
