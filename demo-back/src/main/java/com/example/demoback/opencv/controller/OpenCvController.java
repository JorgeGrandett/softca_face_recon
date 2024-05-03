package com.example.demoback.opencv.controller;

import com.example.demoback.facerecon.dto.Usuario;
import com.example.demoback.facerecon.dto.UsuarioImagen;
import com.example.demoback.opencv.service.OpenCvService;
import com.example.demoback.util.CustomException;
import com.example.demoback.util.ResponseMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/validate")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OpenCvController {

    private final OpenCvService openCvService;

    public OpenCvController(OpenCvService openCvService) {
        this.openCvService = openCvService;
    }

    public ResponseEntity<ResponseMessage<Usuario>> searchLiveFace (@RequestParam("file") MultipartFile face) {
        try {
            Optional<Usuario> response = openCvService.searchLiveFace(face);
            if(response.isPresent()) {
                return ResponseEntity.ok(new ResponseMessage<>(200, "Usuario validado con exito", response.get()));
            }
            return ResponseEntity.ok(new ResponseMessage<>(404, "No se encontro el usuario", null));
        } catch (IOException e) {
            return ResponseEntity.ok(new ResponseMessage<>(500, "Error al convertir la foto a Base64", null));
        } catch (IllegalAccessException e) {
            return ResponseEntity.ok(new ResponseMessage<>(500, "Error al validar el rostro en en OpenCV", null));
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseMessage<>(500, "Error en el proceso de autenticacion", null));
        }
    }

    @PostMapping
    public ResponseEntity<ResponseMessage<UsuarioImagen>> search (@RequestParam("file") MultipartFile face) {
        try {
            UsuarioImagen response = openCvService.search(face);
            if(response != null) {
                return ResponseEntity.ok(new ResponseMessage<>(200, "Usuario validado con exito", response));
            }
            return ResponseEntity.ok(new ResponseMessage<>(404, "No se encontro el usuario", null));
        } catch (IOException e) {
            return ResponseEntity.ok(new ResponseMessage<>(500, "Error al convertir la foto a Base64", null));
        } catch (IllegalAccessException e) {
            return ResponseEntity.ok(new ResponseMessage<>(500, "Error al validar el rostro en en OpenCV", null));
        }  catch (CustomException e) {
            return ResponseEntity.ok(new ResponseMessage<>(404, "No se encontro conincidencia en OpenCV", null));
        }  catch (Exception e) {
            return ResponseEntity.ok(new ResponseMessage<>(500, "Error en el proceso de autenticacion", null));
        }
    }

}
