package com.example.CryptoCommunityServer.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;


@Entity
@Table(name="joined_base_user")
@Inheritance(strategy = InheritanceType.JOINED)
public class BaseUserJoined {
@Id
@GenericGenerator(name = "UseExistingIdOtherwiseGenerateUsingIdentity", strategy = "com.example.CryptoCommunityServer.models.UseExistingIdOtherwiseGenerateUsingIdentity")
@GeneratedValue(generator = "UseExistingIdOtherwiseGenerateUsingIdentity")
  protected Long id;
  protected String username;
  protected String password;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}

