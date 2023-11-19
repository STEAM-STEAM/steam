package com.steam.steam.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    List<User> findByBlacklistedTrue();

    @Query("SELECT u FROM User u WHERE u.blacklisted = false")
    List<User> findAllNotBlacklisted();
}
