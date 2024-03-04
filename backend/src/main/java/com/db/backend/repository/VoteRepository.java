package com.db.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.db.backend.entity.Vote;

public interface VoteRepository extends JpaRepository<Vote, Long> {

}
