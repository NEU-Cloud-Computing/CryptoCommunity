package com.cryptocommunitytest.test.repositories;

import com.cryptocommunitytest.test.models.Post;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends CrudRepository<Post, Long> {

  @Query(value="SELECT * FROM posts WHERE id=:postId", nativeQuery = true)
  public Post findPostById(@Param("postId") String postId);

  @Query(value="SELECT * FROM posts WHERE author=:uid", nativeQuery = true)
  public List<Post> findPostsByUserId(@Param("uid") String uid);

  @Query(value="DELETE FROM posts WHERE id=:postId", nativeQuery = true)
  public Integer deletePostById(@Param("postId") String postId);

  @Query(value="SELECT * FROM posts ORDER BY id DESC LIMIT 10", nativeQuery = true)
  public List<Post> findRecentPost();


}
