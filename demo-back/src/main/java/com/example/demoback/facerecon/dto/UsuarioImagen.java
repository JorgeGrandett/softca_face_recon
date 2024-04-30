package com.example.demoback.facerecon.dto;

import java.util.Date;

public class UsuarioImagen extends Usuario{
    private String imagen;

    public UsuarioImagen(long id, String name, long nmid, String openCvUuid, Date createdAt, String imagen) {
        super(id, name, nmid, openCvUuid, createdAt);
        this.imagen = imagen;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
}
