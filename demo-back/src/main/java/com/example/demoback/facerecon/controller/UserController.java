package com.example.demoback.facerecon.controller;

import com.example.demoback.facerecon.dto.Usuario;
import com.example.demoback.facerecon.service.UserService;
import com.example.demoback.util.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/facerecon")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<ResponseMessage<List<Usuario>>> getAllUsers () {
        /*try {
            List<Usuario> aux = userService.getAll();
            if(!aux.isEmpty()) {
                return ResponseEntity.ok(new ResponseMessage<>(200, null, aux));
            }
            return ResponseEntity.ok(new ResponseMessage<>(404, "No hay usuarios en la base de datos", null));
        }
        catch (Exception e) {
            return ResponseEntity.ok(new ResponseMessage<>(404, "Error al consultar los usuarios", null));
        }*/
        List<Usuario> aux = userService.getAll();
        if(!aux.isEmpty()) {
            return ResponseEntity.ok(new ResponseMessage<>(200, null, aux));
        }
        return ResponseEntity.ok(new ResponseMessage<>(404, "No hay usuarios en la base de datos", null));
    }

    @GetMapping("/user/{nmid}")
    public ResponseEntity<ResponseMessage<Optional<Usuario>>> getUserByNmid (@PathVariable long nmid) {
        try {
            Optional<Usuario> aux = userService.getByMnid(nmid);
            if(aux.isPresent()) {
                return ResponseEntity.ok(new ResponseMessage<>(200, null, null));
            }
            return ResponseEntity.ok(new ResponseMessage<>(404, "No se encontro el usuario", null));
        }
        catch (Exception e) {
            return ResponseEntity.ok(new ResponseMessage<>(404, "Error al consultar el usuario", null));
        }
    }

    @PostMapping("/user")
    public ResponseEntity<ResponseMessage<Usuario>> createUser (@RequestParam("name") String name, @RequestParam("nmid") long nmid, @RequestParam("file") MultipartFile face) {
        try {

            Usuario aux = new Usuario();
            aux.setName(name);
            aux.setNmid(nmid);
            aux.setCreatedAt(new Date());

           userService.create(aux, face);
        } catch (IllegalAccessException e) {
            return ResponseEntity.ok(new ResponseMessage<>(409, "El usuario que intenta crear ya existe", null));
        }
        catch (IOException e) {
            return ResponseEntity.ok(new ResponseMessage<>(500, "Error al convertir la foto a Base64", null));
        }
        catch (Exception e) {
            return ResponseEntity.ok(new ResponseMessage<>(500, "Error al crear el usuario", null));
        }
        return ResponseEntity.ok(new ResponseMessage<>(200, "Usuario creado con exito", null));
    }

    @PutMapping("/user")
    public ResponseEntity<ResponseMessage<Usuario>> updateUser (@RequestBody Usuario usuario, @RequestParam("file") MultipartFile face) {
        if(usuario.getNmid() == 0) {
            return ResponseEntity.ok(new ResponseMessage<>(400, "Datos del usuario incompletos", null));
        }
        try {
            userService.update(usuario);
        } catch (IllegalAccessException e) {
            return ResponseEntity.ok(new ResponseMessage<>(409, "El usuario que intenta actualizar no existe", null));
        }
        catch (Exception e) {
            return ResponseEntity.ok(new ResponseMessage<>(500, "Error al actualizar el usuario", null));
        }
        return ResponseEntity.ok(new ResponseMessage<>(200, "Usuario actualizado con exito", null));
    }

    @DeleteMapping("/user/{nmid}")
    public ResponseEntity<ResponseMessage<Usuario>> deleteUser (@PathVariable long nmid) {
        if(nmid == 0) {
            return ResponseEntity.ok(new ResponseMessage<>(400, "Nmid faltante", null));
        }
        try {
            userService.delete(nmid);
        } catch (IllegalAccessException e) {
            return ResponseEntity.ok(new ResponseMessage<>(409, "El usuario que intenta eliminar no existe", null));
        }
        catch (Exception e) {
            return ResponseEntity.ok(new ResponseMessage<>(500, "Error al eliminar el usuario", null));
        }
        return ResponseEntity.ok(new ResponseMessage<>(200, "Usuario eliminado con exito", null));
    }

    @PostMapping("/authenticate/user")
    public ResponseEntity<ResponseMessage<Usuario>> authenticateUser (@RequestParam("file") MultipartFile face) {
        return null;
    }

}
