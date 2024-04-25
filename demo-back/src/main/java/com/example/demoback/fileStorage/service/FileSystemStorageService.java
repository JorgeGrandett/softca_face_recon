package com.example.demoback.fileStorage.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileSystemStorageService {

    @Value("${media.location}")
    private String mediaLocation;

    private Path rootLocation;

    @PostConstruct
    public void init() throws IOException {
        rootLocation = Paths.get(mediaLocation);
        Files.createDirectories(rootLocation);
    }

    public String store(MultipartFile file, long nmid) {
        try {
            if(file.isEmpty()) {
                throw new RuntimeException("Error al guardar el la foto");
            }

            String filename = nmid + "." + file.getOriginalFilename().split("\\.")[1];
            Path destinationFile = rootLocation.resolve(Paths.get(filename)).normalize().toAbsolutePath();
            try(InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }
            return filename;
        }catch (IOException e) {
            throw new RuntimeException("Fallo al guardar la foto", e);
        }
    }

    public Resource loadAsResource (String fileName) {
        try {
            Path file = rootLocation.resolve(fileName);
            Resource resource = new UrlResource((file.toUri()));

            if(resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new RuntimeException("No se puede leer la foto "+ fileName);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("No se puede leer la foto "+ fileName);
        }
    }
}
