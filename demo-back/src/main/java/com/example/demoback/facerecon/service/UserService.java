package com.example.demoback.facerecon.service;

import com.example.demoback.facerecon.dao.UserDao;
import com.example.demoback.facerecon.dto.Usuario;
import com.example.demoback.facerecon.dto.UsuarioImagen;
import com.example.demoback.opencv.dao.OpenCvDao;
import com.example.demoback.opencv.dto.CreatePerson.CreatePersonReq;
import com.example.demoback.opencv.dto.GetPersons.GetPersonsRes;
import com.example.demoback.opencv.dto.Person;
import com.example.demoback.opencv.dto.UpdatePerson.UpdatePersonReq;
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

    public List<UsuarioImagen> getAll () throws IllegalAccessException {
        List<Usuario> users = userDao.findAll();
        List<Person> opencvUsers = openCvDao.getPersons().getPersons();
        List<UsuarioImagen> newUserList = new ArrayList<>();

        for(Usuario usuario: users) {
            Optional<Person> personOptional = opencvUsers.stream()
                    .filter(person -> person.getId().equals(usuario.getOpenCvUuid()))
                    .findFirst();

            personOptional.ifPresent(person -> newUserList.add(new UsuarioImagen(usuario.getId(), usuario.getName(), usuario.getNmid(), usuario.getOpenCvUuid(), usuario.getCreatedAt(), person.getThumbnails().get(0).getThumbnail()) ));
        }
        return newUserList;
    }

    public UsuarioImagen getByMnid (long nmid) throws IllegalAccessException {
        Optional<Usuario> auxUser = userDao.findByNmid(nmid);
        UsuarioImagen usuarioImagen = null;

        if(auxUser.isPresent()) {
            Usuario usuario = auxUser.get();
            Person person = openCvDao.getPerson(usuario.getOpenCvUuid());
            usuarioImagen = new UsuarioImagen(usuario.getId(), usuario.getName(), usuario.getNmid(), usuario.getOpenCvUuid(), usuario.getCreatedAt(), person.getThumbnails().get(0).getThumbnail());
        }
        return usuarioImagen;
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
                "M",
                uuid,
                List.of(Base64.encodeBase64String(face.getBytes())),
                false,
                usuario.getName(),
                "Colombian",
                ""+usuario.getNmid()
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
        Person personAux = openCvDao.getPerson(aux.get().getOpenCvUuid());
        UpdatePersonReq updatePersonReq = new UpdatePersonReq(
                null,
                null,
               null,
                personAux.getId(),
                null,
                usuario.getName(),
                null,
                null
        );
        if(!openCvDao.updatePerson(updatePersonReq)) {
            throw new IllegalTransactionStateException("Error al actualizar el usuario en OpenCV");
        }
        userDao.update(usuario.getName(), usuario.getNmid(), usuario.getOpenCvUuid());
    }

    @Transactional
    public void delete (long nmid) throws IllegalAccessException {
        Optional<Usuario> aux = userDao.findByNmid(nmid);
        if(aux.isEmpty()) {
            throw new IllegalAccessException("El usuario no existe");
        }
        if(!openCvDao.deletePerson(aux.get().getOpenCvUuid())) {
            throw new IllegalTransactionStateException("Error al eliminar el usuario en OpenCV");
        }
        userDao.deleteByNmid(nmid);
    }
}
