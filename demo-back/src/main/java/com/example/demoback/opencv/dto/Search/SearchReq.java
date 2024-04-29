package com.example.demoback.opencv.dto.Search;

import java.util.List;

public class SearchReq {
    private String collection_id;
    private List<String> images;
    private int max_results;
    private float min_score;
    private String search_mode;

    public SearchReq(String collection_id, List<String> images, int max_results, float min_score, String search_mode) {
        this.collection_id = collection_id;
        this.images = images;
        this.max_results = max_results;
        this.min_score = min_score;
        this.search_mode = search_mode;
    }

    public String getCollection_id() {
        return collection_id;
    }

    public void setCollection_id(String collection_id) {
        this.collection_id = collection_id;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
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

    public String getSearch_mode() {
        return search_mode;
    }

    public void setSearch_mode(String search_mode) {
        this.search_mode = search_mode;
    }
}
