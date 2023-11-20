package com.steam.steam.config;

public enum AccessPath {

    ARTICLE_API_PATH("/api/article/images/");

    private final String path;

    AccessPath(String path) {
        this.path = path;
    }

    public String get() {
        return path;
    }
}
