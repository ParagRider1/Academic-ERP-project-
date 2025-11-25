package com.academicerp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Map<String, Object>> handleIllegalArgument(IllegalArgumentException ex) {
    return ResponseEntity.status(HttpStatus.FORBIDDEN)
      .body(Map.of(
        "status", 403,
        "error", "Forbidden",
        "message", ex.getMessage()
      ));
  }

  @ExceptionHandler(NullPointerException.class)
  public ResponseEntity<Map<String, Object>> handleNpe(NullPointerException ex) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .body(Map.of(
        "status", 500,
        "error", "Internal Server Error",
        "message", ex.getMessage()
      ));
  }
}
