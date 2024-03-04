package com.db.backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.db.backend.converter.VotingConverter;
import com.db.backend.dto.VotingDTO;
import com.db.backend.entity.Vote;
import com.db.backend.entity.Voting;
import com.db.backend.infra.exception.DuplicateVotingException;
import com.db.backend.repository.VotingRepository;

@Service
public class VotingService {

  @Autowired
  private VotingRepository votingRepository;
  @Autowired
  private VotingConverter votingConverter;

  @Autowired
  private RestaurantService restaurantService;

  public Voting getCurrentVoting() {
    LocalDateTime votingStart = LocalDate.now().atStartOfDay();

    Voting voting = votingRepository.findByOpeningDateTime(votingStart);

    if (voting == null) {
      voting = createVoting();
    } else if (!voting.getClosed()) {
      voting = closeVotingIfNecessary(voting);
    }

    return voting;
  }

  private Voting createVoting() {
    LocalDate openingDate = LocalDate.now();

    if (votingRepository.existsByOpeningDateTimeBetween(
        openingDate.atStartOfDay(), openingDate.atTime(23, 59, 59))) {
      throw new DuplicateVotingException("A voting session already exists for the specified date");
    }

    restaurantService.updateWinnerBlockForCurrentWeek();

    Voting voting = new Voting();

    closeVotingIfNecessary(voting);

    return votingRepository.save(voting);
  }

  private Voting closeVotingIfNecessary(Voting voting) {
    LocalDateTime votingStart = LocalDate.now().atStartOfDay();
    LocalDateTime currentDate = LocalDateTime.now();
    LocalDateTime votingEnd = LocalDate.now().atTime(22, 0); // alterar de volta para 11

    if (currentDate.isBefore(votingStart) || currentDate.isAfter(votingEnd)) {
      if (!voting.getClosed()) {
        voting.setClosed(true);
        if (!(voting.getWinningRestaurant() == null)) {
          voting.getWinningRestaurant().setWinnerBlock(true);
          voting.getWinningRestaurant().setWinWeek(LocalDate.now().get(WeekFields.ISO.weekOfWeekBasedYear()));
        }
      }
      return voting;
    }
    return voting;
  }

  public VotingDTO addVoteToCurrentVoting(Vote vote) {
    Voting currentVoting = getCurrentVoting();

    currentVoting.getVotes().add(vote);

    currentVoting = votingRepository.save(currentVoting);

    return votingConverter.convertToDTO(currentVoting);
  }

  public List<VotingDTO> getAllVotings() {
    return votingRepository.findAll().stream()
        .map(votingConverter::convertToDTO)
        .collect(Collectors.toList());
  }
}
