package com.db.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "addresses")
@Entity(name = "addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Address {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @Column(nullable = false)
  @NotBlank(message = "Number is mandatory")
  private String number;

  @Column(nullable = false)
  @NotBlank(message = "Postal Code is mandatory")
  @Size(min = 8, message = "User must provide a valid postal code")
  private String postCode;

  @Column(nullable = false)
  @NotBlank(message = "Neighborhood is mandatory")
  private String neighborhood;

  @Column(nullable = false)
  @NotBlank(message = "Street is mandatory")
  private String street;

  @Column(nullable = false)
  @NotBlank(message = "City is mandatory")
  private String city;

  @Column(nullable = false)
  @NotBlank(message = "State is mandatory")
  private String state;

  @OneToOne(mappedBy = "address")
  private Restaurant restaurant;

  public Address(String number, String postCode, String neighborhood, String street, String city, String state) {
    this.number = number;
    this.postCode = postCode;
    this.neighborhood = neighborhood;
    this.street = street;
    this.city = city;
    this.state = state;
  }

}
