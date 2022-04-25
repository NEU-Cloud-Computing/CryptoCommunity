package com.cryptocommunitytest.test.models;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "joined_normal_user")
public class NormalUserJoined extends BaseUserJoined {
  @Column(name = "date_joined")
  private Date dateJoined;

  public Date getDateJoined() {
    return dateJoined;
  }

  public void setDateJoined(Date dateJoined) {
    this.dateJoined = dateJoined;
  }
}
