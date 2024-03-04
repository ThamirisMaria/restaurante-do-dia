package com.db.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.db.backend.entity.Voting;
import com.db.backend.infra.exception.DuplicateVotingException;
import com.db.backend.service.VotingService;

@RestController
@RequestMapping("/voting")
public class VotingController {

  @Autowired
  private VotingService votingService;

  @GetMapping("/current")
  public ResponseEntity<Object> getCurrentVoting() {
    try {
      Voting voting = votingService.getCurrentVoting();

      return ResponseEntity.ok(voting);
    } catch (DuplicateVotingException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body("Duplicate Voting: " + e.getMessage());
    }
  }
}
