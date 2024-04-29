package com.example.demoback.opencv.dao;

import com.example.demoback.opencv.dto.CreatePerson.CreatePersonReq;
import com.example.demoback.opencv.dto.DeletePerson.DeletePersonRes;
import com.example.demoback.opencv.dto.GetPersons.GetPersonsRes;
import com.example.demoback.opencv.dto.Person;
import com.example.demoback.opencv.dto.Search.SearchReq;
import com.example.demoback.opencv.dto.SearchLiveFace.SearchLiveFacePerson;
import com.example.demoback.opencv.dto.SearchLiveFace.SearchLiveFaceReq;
import com.example.demoback.opencv.dto.SearchLiveFace.SearchLiveFaceRes;
import com.example.demoback.opencv.dto.UpdatePerson.UpdatePersonReq;
import com.example.demoback.util.CustomException;
import com.example.demoback.util.LocalDateTypeAdapter;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@Repository
public class OpenCvDao {

    @Value("${opencv.api.key}")
    private String apiKey;

    @Value("${opencv.api.url}")
    private String apiUrl;

    RestTemplate restTemplate;
    HttpHeaders headers;
    Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateTypeAdapter()).create();

    private void init (boolean hasBody) {
        restTemplate = new RestTemplate();

        headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("X-API-Key", apiKey);
        if(hasBody) headers.setContentType(MediaType.APPLICATION_JSON);
    }

    public GetPersonsRes getPersons () throws IllegalAccessException {
        init(false);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<?> result = restTemplate.exchange(apiUrl+"persons", HttpMethod.GET, entity, GetPersonsRes.class);
        if(result.getStatusCode() != HttpStatus.OK) {
            throw new IllegalAccessException("Error al consultar los usuarios en OpenCV");
        }
        return (GetPersonsRes) result.getBody();
    }

    public Person getPerson (String id) throws IllegalAccessException {
        init(false);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<?> result = restTemplate.exchange(apiUrl+"person/"+id, HttpMethod.GET, entity, Person.class);
        if(result.getStatusCode() != HttpStatus.OK) {
            throw new IllegalAccessException("Error al consultar el usuarios en OpenCV");
        }
        return (Person) result.getBody();
    }

    public boolean createPerson (CreatePersonReq createPersonReq) {
        init(true);

        HttpEntity<String> entity = new HttpEntity<>(gson.toJson(createPersonReq), headers);
        ResponseEntity<?> result = restTemplate.exchange(apiUrl+"person", HttpMethod.POST, entity, Person.class);
        return result.getStatusCode() == HttpStatus.CREATED;
    }

    public boolean deletePerson (String id) {
        init(false);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<?> result = restTemplate.exchange(apiUrl+"person/"+id, HttpMethod.DELETE, entity, DeletePersonRes.class);
        return result.getStatusCode() == HttpStatus.OK;
    }

    public boolean updatePerson (UpdatePersonReq updatePersonReq) {
        init(true);

        HttpEntity<String> entity = new HttpEntity<>(gson.toJson(updatePersonReq), headers);
        ResponseEntity<?> result = restTemplate.exchange(apiUrl+"person", HttpMethod.PATCH, entity, Person.class);
        return result.getStatusCode() == HttpStatus.OK;
    }

    public SearchLiveFaceRes searchLiveFace (SearchLiveFaceReq searchLiveFaceReq) throws IllegalAccessException {
        init(true);

        HttpEntity<String> entity = new HttpEntity<>(gson.toJson(searchLiveFaceReq), headers);
        ResponseEntity<?> result = restTemplate.exchange(apiUrl+"search-live-face", HttpMethod.POST, entity, SearchLiveFaceRes.class);
        if(result.getStatusCode() != HttpStatus.OK) {
            throw new IllegalAccessException("Error al validar la coincidencia de rostro en OpenCV");
        }
        return (SearchLiveFaceRes) result.getBody();
    }

    public SearchLiveFacePerson search (SearchReq searchReq) throws IllegalAccessException, CustomException {
        init(true);

        ParameterizedTypeReference<List<SearchLiveFacePerson>> parameterizedTypeReference = new ParameterizedTypeReference<List<SearchLiveFacePerson>>() {};

        HttpEntity<String> entity = new HttpEntity<>(gson.toJson(searchReq), headers);
        ResponseEntity<?> result = restTemplate.exchange(apiUrl+"search", HttpMethod.POST, entity, parameterizedTypeReference);

        if(result.getStatusCode() != HttpStatus.OK) {
            throw new IllegalAccessException("Error al validar la coincidencia de rostro en OpenCV");
        }
        List<SearchLiveFacePerson> response = (List<SearchLiveFacePerson>) result.getBody();
        if(response.isEmpty()) {
            throw new CustomException(CustomException.EMPTY_VALUE);
        }
        return response.get(0);
    }
}
