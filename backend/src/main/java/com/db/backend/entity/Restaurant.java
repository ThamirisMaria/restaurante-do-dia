package com.db.backend.entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.rest.core.annotation.RestResource;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "restaurants")
@Entity(name = "restaurants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Restaurant {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @Column(nullable = false)
  @NotBlank(message = "Name is mandatory")
  private String name;

  @Column(nullable = false)
  @NotBlank(message = "Description is mandatory")
  private String description;

  @Column
  private String website;

  @Column
  private String image;

  @Column(nullable = false)
  private Boolean winnerBlock = false;

  @OneToOne
  @JoinColumn(name = "address_id")
  @RestResource(path = "restaurantAddress", rel = "address")
  @NotNull(message = "Restaurant is mandatory")
  private Address address;

  @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Vote> votes = new ArrayList<>();

  @OneToMany(mappedBy = "winningRestaurant", cascade = CascadeType.ALL)
  private List<Voting> wonVotings = new ArrayList<>();

  @Column
  private Integer winWeek;

  public Restaurant(String name, String description, String website, String image, Address address) {
    this.name = name;
    this.description = description;
    this.website = website;
    this.image = image;
    this.winnerBlock = false;
    this.address = address;
  }

}
