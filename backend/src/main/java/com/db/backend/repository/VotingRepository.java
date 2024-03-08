package com.db.backend.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;

import com.db.backend.entity.Voting;

public interface VotingRepository extends JpaRepository<Voting, Long> {
  Voting findByOpeningDateTime(LocalDateTime openingDateTime);

  boolean existsByOpeningDateTimeBetween(LocalDateTime start, LocalDateTime end);
}
