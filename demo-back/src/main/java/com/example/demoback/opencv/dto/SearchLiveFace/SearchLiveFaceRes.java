package com.example.demoback.opencv.dto.SearchLiveFace;

import java.util.List;

public class SearchLiveFaceRes {

    private int liveness_score;
    private List<SearchLiveFacePerson> persons;

    public int getLiveness_score() {
        return liveness_score;
    }

    public void setLiveness_score(int liveness_score) {
        this.liveness_score = liveness_score;
    }

    public List<SearchLiveFacePerson> getPersons() {
        return persons;
    }

    public void setPersons(List<SearchLiveFacePerson> persons) {
        this.persons = persons;
    }
}
