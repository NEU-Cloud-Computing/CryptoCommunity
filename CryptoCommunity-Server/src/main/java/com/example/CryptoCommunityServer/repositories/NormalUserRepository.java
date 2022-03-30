package com.example.CryptoCommunityServer.repositories;

import com.example.CryptoCommunityServer.models.NormalUserJoined;
import org.springframework.data.repository.CrudRepository;

public interface NormalUserRepository extends CrudRepository<NormalUserJoined, Long> {

}
