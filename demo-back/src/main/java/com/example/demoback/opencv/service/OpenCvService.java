package com.example.demoback.opencv.service;

import com.example.demoback.facerecon.dao.UserDao;
import com.example.demoback.facerecon.dto.Usuario;
import com.example.demoback.opencv.dao.OpenCvDao;
import com.example.demoback.opencv.dto.Search.SearchReq;
import com.example.demoback.opencv.dto.SearchLiveFace.SearchLiveFacePerson;
import com.example.demoback.opencv.dto.SearchLiveFace.SearchLiveFaceReq;
import com.example.demoback.opencv.dto.SearchLiveFace.SearchLiveFaceRes;
import com.example.demoback.util.CustomException;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class OpenCvService {

    private final OpenCvDao openCvDao;
    private final UserDao userDao;

    @Autowired
    public OpenCvService (OpenCvDao openCvDao, UserDao userDao) {
        this.openCvDao = openCvDao;
        this.userDao = userDao;
    }

    public Optional<Usuario> searchLiveFace (MultipartFile face) throws IOException, IllegalAccessException {

        SearchLiveFaceReq searchLiveFaceReq = new SearchLiveFaceReq(
                "",
                Base64.encodeBase64String(face.getBytes()),
                1,
                0.7F,
                "DESKTOP",
                "ACCURATE"
        );

        SearchLiveFaceRes searchLiveFaceRes = openCvDao.searchLiveFace(searchLiveFaceReq);

        return userDao.findByNmid(Long.parseLong(searchLiveFaceRes.getPersons().get(0).getNotes()));
    }

    public Optional<Usuario> search (MultipartFile face) throws IOException, IllegalAccessException, CustomException {

        SearchReq searchReq = new SearchReq(
                null,
                List.of(Base64.encodeBase64String(face.getBytes())),
                1,
                0.7F,
                "ACCURATE"
        );

        SearchLiveFacePerson searchLiveFacePerson = openCvDao.search(searchReq);

        return userDao.findByNmid(Long.parseLong(searchLiveFacePerson.getNotes()));
    }
}
