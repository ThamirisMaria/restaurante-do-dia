package com.db.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "Votes")
@Entity(name = "Votes")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Vote {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  @NotNull(message = "User is mandatory")
  private User user;

  @ManyToOne
  @JoinColumn(name = "restaurant_id")
  @NotNull(message = "Restaurant is mandatory")
  private Restaurant restaurant;

  @ManyToOne
  private Voting voting;

  public Vote(@NotNull User user, @NotNull Restaurant restaurant, @NotNull Voting voting) {
    this.user = user;
    this.restaurant = restaurant;
    this.voting = voting;
  }
}
