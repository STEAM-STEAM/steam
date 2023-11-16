package com.steam.steam.article;

import com.steam.steam.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Long> {
    List<History> findBySeller(User user);
}
