package com.steam.steam;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.List;

@Service
@Slf4j
public class FileStorageService {

    @Transactional
    public void storeImage(MultipartFile file, Path filePath) {
        try {
            Files.createDirectories(filePath.getParent());
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            log.debug("storeImage 완료: ", filePath);
        } catch (Exception e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    @Transactional
    public void storeImages(List<MultipartFile> files, List<Path> filePaths) {
        if (files.size() != filePaths.size()) {
            throw new IllegalArgumentException("[ERROR] files랑 filePaths 길이 불일치");
        }
        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            Path filePath = filePaths.get(i);
            storeImage(file, filePath);
        }
    }
}
