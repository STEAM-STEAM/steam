package com.steam.steam;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;

@Service
public class FileStorageService {

    private static final String storagePath = "./src/main/java/com/steam/steam/article/pic/";

    public void storeFile(MultipartFile file, Long articleId) {
        Path imagePath;
        try {
            Path dirPath = Paths.get(storagePath).resolve(String.valueOf(articleId));

            if (!Files.exists(dirPath)) {
                Files.createDirectories(dirPath);
            }
            imagePath = Path.of(dirPath + "/onlyOnePicture.jpg");
            Files.copy(file.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            throw new RuntimeException("Failed to store file", e);
        }


    }

    public static String getArticleImageSavePath(Long articleId) {
        return Paths.get(storagePath).resolve(String.valueOf(articleId)).toString();
    }
}
