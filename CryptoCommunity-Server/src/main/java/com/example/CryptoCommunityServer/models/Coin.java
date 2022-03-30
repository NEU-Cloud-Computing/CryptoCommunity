package com.example.CryptoCommunityServer.models;

import javax.annotation.processing.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="coins")
public class Coin {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String userId;
  private String coinName;

  public Coin() {
  }

  public Coin(Long id, String userId, String coinName) {
    this.id = id;
    this.userId = userId;
    this.coinName = coinName;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getCoinName() {
    return coinName;
  }

  public void setCoinName(String coinName) {
    this.coinName = coinName;
  }
}