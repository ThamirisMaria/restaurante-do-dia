package com.db.backend.infra.exception;

public class ClosedVotingException extends RuntimeException {
  public ClosedVotingException(String message) {
    super(message);
  }
}
