package com.example.CryptoCommunityServer.services;


import com.example.CryptoCommunityServer.models.Comment;
import com.example.CryptoCommunityServer.repositories.CommentRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

  @Autowired
  CommentRepository repository;

  public Comment createCommentForPost(Comment newComment){
    return repository.save(newComment);
  }

  public List<Comment> findCommentsByPost(String postId){
    return repository.findCommentsByPost(postId);
  }

  public List<Comment> findCommentsByUser(String userId){
    return repository.findCommentsByUser(userId);
  }

  public Integer deleteCommentById(String postId){
    return repository.deleteCommentById(postId);
  }

}
