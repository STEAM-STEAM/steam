package com.steam.steam.admin;


import com.steam.steam.article.ArticleService;
import com.steam.steam.article.dto.MessageResponseDto;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin")
@CrossOrigin(origins = "http://localhost:3000")
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

    @DeleteMapping("/blacklist/add/{userId}")
    @Transactional
    public ResponseEntity<MessageResponseDto> addToBlacklist(@PathVariable String userId) {
        adminService.setBlacklist(userId, true);
        articleService.deleteArticles(userId);
        return ResponseEntity.ok().body(new MessageResponseDto("success"));
    }

    @GetMapping("/blacklist/remove/{userId}")
    @Transactional
    public ResponseEntity<MessageResponseDto> removeBlacklist(@PathVariable String userId) {
        adminService.setBlacklist(userId, false);
        return ResponseEntity.ok().body(new MessageResponseDto("success"));
    }



}
