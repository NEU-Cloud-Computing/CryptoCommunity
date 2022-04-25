package com.cryptocommunitytest.test.services;

import com.cryptocommunitytest.test.models.Post;
import com.cryptocommunitytest.test.repositories.PostRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

  @Autowired
  PostRepository repository;

  public Post createPost(Post newPost){
    return repository.save(newPost);
  }

  public List<Post> findPostByUserId(String userId){
    return repository.findPostsByUserId(userId);
  }

  public List<Post> findRecentPosts(){
    return repository.findRecentPost();
  }
  public Post findPostById(String postId){
    return repository.findPostById(postId);
  }

  public Integer deletePostById(String postId){
    repository.deleteById(Long.valueOf(postId));
    return 1;
  }

}
