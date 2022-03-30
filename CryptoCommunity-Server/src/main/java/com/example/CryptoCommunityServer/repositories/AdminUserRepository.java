package com.example.CryptoCommunityServer.repositories;

import com.example.CryptoCommunityServer.models.AdminUserJoined;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface AdminUserRepository extends CrudRepository<AdminUserJoined, Long> {

  @Query(value="SELECT * FROM joined_admin_user WHERE id=:userId", nativeQuery = true)
  public AdminUserJoined findByUid(@Param("userId") Long userId);

}
