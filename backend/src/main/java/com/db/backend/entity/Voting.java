package com.db.backend.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Table(name = "Votings")
@Entity(name = "Votings")
public class Voting {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Getter
  private Long id;

  @OneToMany(mappedBy = "voting", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  @Getter
  @Setter
  private List<Vote> votes = new ArrayList<>();

  @Column
  @NotNull(message = "Opening date/time is required")
  private LocalDateTime openingDateTime;

  @Column
  @NotNull(message = "Closing date/time is required")
  private LocalDateTime closingDateTime;

  @Column
  @NotNull
  @Getter
  @Setter
  private Boolean closed = false;

  @ManyToOne
  @Getter
  @Setter
  private Restaurant winningRestaurant;

  public Voting() {
    this.openingDateTime = getOpeningDateTime();
    this.closingDateTime = getClosingDateTime();
  }

  public LocalDateTime getOpeningDateTime() {
    return LocalDate.now().atStartOfDay();
  }

  public LocalDateTime getClosingDateTime() {
    return LocalDate.now().atTime(11, 0);
  }

}
