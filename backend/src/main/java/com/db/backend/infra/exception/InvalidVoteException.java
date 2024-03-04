package com.db.backend.infra.exception;

public class InvalidVoteException extends RuntimeException {
  public InvalidVoteException(String message) {
    super(message);
  }
}
