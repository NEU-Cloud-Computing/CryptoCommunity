package com.example.CryptoCommunityServer.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "posts")
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String postDate;
  private String author;
  private String title;
  @Lob
  private String body;
  private Boolean isFlagged;

  public Post(Long id, String postDate, String author, String title,
      String body, Boolean isFlagged) {
    this.id = id;
    this.postDate = postDate;
    this.author = author;
    this.title = title;
    this.body = body;
    this.isFlagged = isFlagged;
  }

  public Post() {
  }

  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getPostDate() {
    return postDate;
  }

  public void setPostDate(String postDate) {
    this.postDate = postDate;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getBody() {
    return body;
  }

  public void setBody(String body) {
    this.body = body;
  }

  public Boolean getFlagged() {
    return isFlagged;
  }

  public void setFlagged(Boolean flagged) {
    isFlagged = flagged;
  }
}
