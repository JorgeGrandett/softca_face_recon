package com.example.demoback.opencv.dao;

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

    public Object getPersons () {
        restTemplate = new RestTemplate();

        headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("X-API-Key", apiKey);

        System.out.println(headers.get("X-API-Key"));
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<?> result = restTemplate.exchange(apiUrl+"persons", HttpMethod.GET, entity, Object.class);
        System.out.println(gson.fromJson(result.getBody().toString(), Object.class));

        return result.getBody();
    }

    public Object createPerson () {
        HttpEntity<String> entity = new HttpEntity<>(null, headers);
        ResponseEntity<?> result = restTemplate.exchange(apiUrl+"person", HttpMethod.POST, entity, Object.class);
        System.out.println(result.getBody());
        return result.getBody();
    }

    public Object searchLiveFace () {
        HttpEntity<String> entity = new HttpEntity<>(null, headers);
        ResponseEntity<?> result = restTemplate.exchange(apiUrl+"person", HttpMethod.POST, entity, Object.class);
        System.out.println(result.getBody());
        return result.getBody();
    }
}
