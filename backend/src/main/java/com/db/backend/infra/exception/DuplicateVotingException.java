package com.db.backend.infra.exception;

public class DuplicateVotingException extends RuntimeException {
  public DuplicateVotingException(String message) {
    super(message);
  }
}
