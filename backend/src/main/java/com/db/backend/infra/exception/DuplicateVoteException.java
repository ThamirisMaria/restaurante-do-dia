package com.db.backend.infra.exception;

public class DuplicateVoteException extends RuntimeException {
  public DuplicateVoteException(String message) {
    super(message);
  }
}
