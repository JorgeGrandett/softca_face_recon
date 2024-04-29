package com.example.demoback.opencv.dto.SearchLiveFace;

import com.example.demoback.opencv.dto.Person;

public class SearchLiveFacePerson extends Person {

    private int score;

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
