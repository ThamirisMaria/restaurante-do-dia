package com.db.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.db.backend.dto.RestaurantDTO;
import com.db.backend.dto.VotingDTO;
import com.db.backend.entity.User;
import com.db.backend.entity.Vote;
import com.db.backend.infra.exception.DuplicateVoteException;
import com.db.backend.infra.exception.InvalidVoteException;
import com.db.backend.service.VoteService;
import com.db.backend.service.VotingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/vote")
public class VoteController {

  @Autowired
  private VoteService voteService;

  @Autowired
  private VotingService votingService;

  @PostMapping()
  public ResponseEntity<Object> registerVote(
      @RequestBody @Valid RestaurantDTO restaurantDTO) {
    try {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      User user = (User) authentication.getPrincipal();

      Vote vote = voteService.registerVote(user, restaurantDTO);

      VotingDTO updatedVoting = votingService.addVoteToCurrentVoting(vote);

      return ResponseEntity.status(HttpStatus.CREATED).body(updatedVoting);

    } catch (DuplicateVoteException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body("Duplicate Vote: " + e.getMessage());
    } catch (InvalidVoteException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid vote: " + e.getMessage());
    }
  }
}
