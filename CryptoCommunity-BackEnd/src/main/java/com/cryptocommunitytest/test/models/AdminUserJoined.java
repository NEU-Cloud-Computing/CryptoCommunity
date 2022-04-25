package com.cryptocommunitytest.test.models;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
@Entity
@Table(name="joined_admin_user")
public class AdminUserJoined extends BaseUserJoined {
  @Column(name = "posts_deleted")
  private int postsDeleted;

  public int getPostsDeleted() {
    return postsDeleted;
  }

  public void setPostsDeleted(int postsDeleted) {
    this.postsDeleted = postsDeleted;
  }

  public AdminUserJoined(Long id, int postsDeleted, String username, String password) {
    this.id = id;
    this.postsDeleted = postsDeleted;
    this.username = username;
    this.password = password;
  }

  public AdminUserJoined() {

  }

}
