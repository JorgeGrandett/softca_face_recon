package com.example.demoback.facerecon.service;

import com.example.demoback.facerecon.dao.UserDao;
import com.example.demoback.facerecon.dto.Usuario;
import com.example.demoback.opencv.dao.OpenCvDao;
import com.example.demoback.opencv.dto.CreatePerson.CreatePersonReq;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.IllegalTransactionStateException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserDao userDao;
    private final OpenCvDao openCvDao;

    @Autowired
    public UserService (UserDao userDao, OpenCvDao openCvDao) {
        this.userDao = userDao;
        this.openCvDao = openCvDao;
    }

    public List<Usuario> getAll () {
        return userDao.findAll();
    }

    public Optional<Usuario> getByMnid (long nmid) {
        return userDao.findByNmid(nmid);
    }

    public void create (Usuario usuario, MultipartFile face) throws IllegalAccessException, IOException {
        Optional<Usuario> aux = userDao.findByNmid(usuario.getNmid());
        if(aux.isPresent()) {
            throw new IllegalAccessException("El usuario ya existe");
        }

        String uuid = String.valueOf(UUID.randomUUID());
        CreatePersonReq createPersonReq = new CreatePersonReq(
                new ArrayList<>(),
                LocalDate.now(),
                "I",
                uuid,
                List.of(Base64.encodeBase64String(face.getBytes())),
                false,
                usuario.getName(),
                "Colombian",
                null
        );
        if(!openCvDao.createPerson(createPersonReq)) {
            throw new IllegalTransactionStateException("Error al crear el usuario en OpenCV");
        }

        usuario.setOpenCvUuid(uuid);

        userDao.save(usuario);
    }

    @Transactional
    public void update (Usuario usuario) throws IllegalAccessException {
        Optional<Usuario> aux = userDao.findByNmid(usuario.getNmid());
        if(aux.isEmpty()) {
            throw new IllegalAccessException("El usuario no existe");
        }
        userDao.update(usuario.getName(), usuario.getNmid(), usuario.getOpenCvUuid());
    }

    @Transactional
    public void delete (long nmid) throws IllegalAccessException {
        Optional<Usuario> aux = userDao.findByNmid(nmid);
        if(aux.isEmpty()) {
            throw new IllegalAccessException("El usuario no existe");
        }
        userDao.deleteByNmid(nmid);
    }
}
