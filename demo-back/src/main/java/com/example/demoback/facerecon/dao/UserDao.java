package com.example.demoback.facerecon.dao;

import com.example.demoback.facerecon.dto.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<Usuario, Long> {

    @Query("SELECT us FROM Usuario us WHERE us.nmid = ?1")
    Optional<Usuario> findByNmid(long nmid);

    @Modifying
    @Query("UPDATE Usuario us SET us.name = ?1, us.imageRoute = ?3 WHERE us.nmid = ?2")
    void update(String name, long nmid, String imageRoute);

    @Modifying
    @Query("DELETE FROM Usuario us WHERE us.nmid = ?1")
    void deleteByNmid(long nmid);
}
