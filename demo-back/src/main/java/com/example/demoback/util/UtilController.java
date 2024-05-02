package com.example.demoback.util;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UtilController {

    @GetMapping()
    public ResponseEntity<ResponseMessage<String>> serverHealth () {
        return ResponseEntity.ok(new ResponseMessage<>(200, "Server status: OK ", null));
    }
}
