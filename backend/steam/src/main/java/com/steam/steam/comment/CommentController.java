package com.steam.steam.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/comment/{articleId}")
    public ResponseEntity<List<CommentResponseDto>> comments(@PathVariable("articleId") Long articleId) {
        List<Comment> comments = commentService.getAllComment(articleId);

        List<CommentResponseDto> allCommentResponseDto = new ArrayList<>();
        comments.forEach(comment -> {
            CommentResponseDto commentResponseDto = CommentResponseDto.of(comment);
            allCommentResponseDto.add(commentResponseDto);
        });

        return ResponseEntity.ok(allCommentResponseDto);
    }

    @PostMapping("/comment")
    public String write(@RequestBody CommentRequestDto commentRequestDto){
        commentService.write(commentRequestDto);

        return "OK";
    }
}
