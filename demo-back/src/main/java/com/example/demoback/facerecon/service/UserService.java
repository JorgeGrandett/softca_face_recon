package com.example.demoback.facerecon.service;

import com.example.demoback.facerecon.dao.UserDao;
import com.example.demoback.facerecon.dto.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserDao userDao;

    @Autowired
    public UserService (UserDao userDao) {
        this.userDao = userDao;
    }

    public List<Usuario> getAll () {
        return userDao.findAll();
    }

    public Optional<Usuario> getByMnid (long nmid) {
        return userDao.findByNmid(nmid);
    }

    public void create (Usuario usuario) throws IllegalAccessException {
        Optional<Usuario> aux = userDao.findByNmid(usuario.getNmid());
        if(aux.isPresent()) {
            throw new IllegalAccessException("El usuario ya existe");
        }
        userDao.save(usuario);
    }

    public void update (Usuario usuario) throws IllegalAccessException {
        Optional<Usuario> aux = userDao.findByNmid(usuario.getNmid());
        if(aux.isEmpty()) {
            throw new IllegalAccessException("El usuario no existe");
        }
        userDao.update(usuario.getName(), usuario.getNmid(), usuario.getImageRoute());
    }

    public void delete (long nmid) throws IllegalAccessException {
        Optional<Usuario> aux = userDao.findByNmid(nmid);
        if(aux.isEmpty()) {
            throw new IllegalAccessException("El usuario no existe");
        }
        userDao.deleteByNmid(nmid);
    }
}
