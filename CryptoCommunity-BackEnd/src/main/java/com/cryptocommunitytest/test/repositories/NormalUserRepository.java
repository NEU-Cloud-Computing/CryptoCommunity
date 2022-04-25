package com.cryptocommunitytest.test.repositories;

import com.cryptocommunitytest.test.models.NormalUserJoined;
import org.springframework.data.repository.CrudRepository;

public interface NormalUserRepository extends CrudRepository<NormalUserJoined, Long> {

}
