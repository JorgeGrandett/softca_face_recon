package com.example.demoback.facerecon.service;

import com.example.demoback.facerecon.dao.UserDao;
import com.example.demoback.facerecon.dto.Usuario;
import com.example.demoback.opencv.dao.OpenCvDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
        openCvDao.getPersons();
        return userDao.findAll();
    }

    public Optional<Usuario> getByMnid (long nmid) {
        return userDao.findByNmid(nmid);
    }

    public void create (Usuario usuario) throws IllegalAccessException {
        openCvDao.createPerson();
        Optional<Usuario> aux = userDao.findByNmid(usuario.getNmid());
        if(aux.isPresent()) {
            throw new IllegalAccessException("El usuario ya existe");
        }
        userDao.save(usuario);
    }

    @Transactional
    public void update (Usuario usuario) throws IllegalAccessException {
        Optional<Usuario> aux = userDao.findByNmid(usuario.getNmid());
        if(aux.isEmpty()) {
            throw new IllegalAccessException("El usuario no existe");
        }
        userDao.update(usuario.getName(), usuario.getNmid());
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