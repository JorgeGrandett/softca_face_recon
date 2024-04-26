package com.example.demoback.opencv.dao;

import com.example.demoback.opencv.dto.CreatePerson.CreatePersonReq;
import com.example.demoback.opencv.dto.GetPersons.GetPersonsRes;
import com.example.demoback.opencv.dto.Person;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Repository
public class OpenCvDao {

    @Value("${opencv.api.key}")
    private String apiKey;

    @Value("${opencv.api.url}")
    private String apiUrl;

    RestTemplate restTemplate;
    HttpHeaders headers;
    Gson gson = new Gson();

    private void init () {
        restTemplate = new RestTemplate();

        headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("X-API-Key", apiKey);
    }

    public GetPersonsRes getPersons () throws IllegalAccessException {
        init();

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<?> result = restTemplate.exchange(apiUrl+"persons", HttpMethod.GET, entity, GetPersonsRes.class);
        if(result.getStatusCode() != HttpStatus.OK) {
            throw new IllegalAccessException("Error al consultar los usuarios en OpenCV");
        }
        return (GetPersonsRes) result.getBody();
    }

    public boolean createPerson (CreatePersonReq createPersonReq) {
        init();

        HttpEntity<String> entity = new HttpEntity<>(gson.toJson(createPersonReq), headers);
        ResponseEntity<?> result = restTemplate.exchange(apiUrl+"person", HttpMethod.POST, entity, Person.class);
        return result.getStatusCode() == HttpStatus.CREATED;
    }

    public Object searchLiveFace () {
        init();

        HttpEntity<String> entity = new HttpEntity<>(null, headers);
        ResponseEntity<?> result = restTemplate.exchange(apiUrl+"person", HttpMethod.POST, entity, Object.class);
        System.out.println(result.getBody());
        return result.getBody();
    }
}
