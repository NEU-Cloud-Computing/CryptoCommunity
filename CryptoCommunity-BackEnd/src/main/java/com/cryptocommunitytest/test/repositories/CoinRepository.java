package com.cryptocommunitytest.test.repositories;

import com.cryptocommunitytest.test.models.Coin;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CoinRepository extends CrudRepository<Coin, Long> {

  @Query(value = "SELECT * FROM coins WHERE user_id=:userId", nativeQuery = true)
  public List<Coin> findCoinsForUser(@Param("userId") String userId);

  @Query(value = "SELECT * FROM coins WHERE coin_name=:coinName", nativeQuery = true)
  public List<Coin> findUsersForCoin(@Param("coinName") String coinName);

  @Query(value = "DELETE FROM coins WHERE user_id=:userId AND coin_name=:coinName", nativeQuery = true)
  public Integer removeCoinFromUser(@Param("coinName") String coinName,
      @Param("userId") String userId);
}




