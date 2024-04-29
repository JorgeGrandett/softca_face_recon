package com.example.demoback.opencv.dto.SearchLiveFace;

public class SearchLiveFaceReq {
    private String collection_id;
    private String image;
    private int max_results;
    private float min_score;
    private String os;
    private String search_mode;

    public SearchLiveFaceReq(String collection_id, String image, int max_results, float min_score, String os, String search_mode) {
        this.collection_id = collection_id;
        this.image = image;
        this.max_results = max_results;
        this.min_score = min_score;
        this.os = os;
        this.search_mode = search_mode;
    }

    public String getCollection_id() {
        return collection_id;
    }

    public void setCollection_id(String collection_id) {
        this.collection_id = collection_id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getMax_results() {
        return max_results;
    }

    public void setMax_results(int max_results) {
        this.max_results = max_results;
    }

    public float getMin_score() {
        return min_score;
    }

    public void setMin_score(float min_score) {
        this.min_score = min_score;
    }

    public String getOs() {
        return os;
    }

    public void setOs(String os) {
        this.os = os;
    }

    public String getSearch_mode() {
        return search_mode;
    }

    public void setSearch_mode(String search_mode) {
        this.search_mode = search_mode;
    }
}
