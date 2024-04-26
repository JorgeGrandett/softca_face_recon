package com.example.demoback.opencv.dto.CreatePerson;

import java.time.LocalDate;
import java.util.List;

public class CreatePersonReq {

    private List<String> collections;
    private LocalDate date_of_birth;
    private String gender;
    private String id;
    private List<String> images;
    private boolean is_bulk_insert;
    private String name;
    private String nationality;
    private String notes;

    public CreatePersonReq() {
    }

    public CreatePersonReq(List<String> collections, LocalDate date_of_birth, String gender, String id, List<String> images, boolean is_bulk_insert, String name, String nationality, String notes) {
        this.collections = collections;
        this.date_of_birth = date_of_birth;
        this.gender = gender;
        this.id = id;
        this.images = images;
        this.is_bulk_insert = is_bulk_insert;
        this.name = name;
        this.nationality = nationality;
        this.notes = notes;
    }

    public List<String> getCollections() {
        return collections;
    }

    public void setCollections(List<String> collections) {
        this.collections = collections;
    }

    public LocalDate getDate_of_birth() {
        return date_of_birth;
    }

    public void setDate_of_birth(LocalDate date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public boolean isIs_bulk_insert() {
        return is_bulk_insert;
    }

    public void setIs_bulk_insert(boolean is_bulk_insert) {
        this.is_bulk_insert = is_bulk_insert;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}