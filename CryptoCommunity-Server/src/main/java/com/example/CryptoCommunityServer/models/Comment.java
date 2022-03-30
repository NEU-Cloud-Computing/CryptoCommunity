package com.example.CryptoCommunityServer.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name ="comments")
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String postDate;
  private String author;
  private String associatedPost;
  @Lob
  private String body;

  public Comment(Long id, String postDate,
      String author, String body) {
    this.id = id;
    this.postDate = postDate;
    this.author = author;
    this.body = body;
  }

  public Comment() {
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

  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  public String getBody() {
    return body;
  }

  public void setBody(String body) {
    this.body = body;
  }

  public String getAssociatedPost() {
    return associatedPost;
  }

  public void setAssociatedPost(String associatedPost) {
    this.associatedPost = associatedPost;
  }
}
