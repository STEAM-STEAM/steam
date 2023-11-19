package com.steam.steam.config;

public enum AccessPath {
    USER_PROFILE("/assets/steam-images/user/");

    private final String path;

    AccessPath(String path) {
        this.path = path;
    }

    public String get() {
        return path;
    }
}
