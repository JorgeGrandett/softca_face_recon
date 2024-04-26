package com.example.demoback.opencv.dto.GetPersons;

import com.example.demoback.opencv.dto.Person;

import java.util.List;

public class GetPersonsRes {

    private int count;
    private List<Person> persons;

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public List<Person> getPersons() {
        return persons;
    }

    public void setPersons(List<Person> persons) {
        this.persons = persons;
    }
}
