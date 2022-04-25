package com.cryptocommunitytest.test.controllers;

import com.cryptocommunitytest.test.models.Coin;
import com.cryptocommunitytest.test.models.Comment;
import com.cryptocommunitytest.test.services.CoinService;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value="/**", method={RequestMethod.OPTIONS})
@CrossOrigin(origins = "http://cryptocommunity-preflight-stage.s3-website-us-west-2.amazonaws.com", allowCredentials = "true")
public class CoinController {

  @Autowired
  CoinService coinService;
  List<Comment> comments = new ArrayList<Comment>();

  @PostMapping("/api/coins/{userId}/add/{coinName}")
  public Coin addCoinToUser(
      @PathVariable("userId") String username,
      @PathVariable("coinName") String coinName,
      HttpSession session
  ){
    Coin generatedCoin = new Coin();
    generatedCoin.setCoinName(coinName);
    generatedCoin.setUserId(username);
    return coinService.addCoinToUser(generatedCoin);
  }

  @DeleteMapping("/api/coins/{userId}/remove/{coinName}")
  public Integer deletePost(
      @PathVariable("userId") String uid,
      @PathVariable("coinName") String cid){
    return coinService.removeCoinFromUser(uid, cid);
  }

  @GetMapping("/api/coins/{userId}")
  public List<Coin> findCoinsForUser(
      @PathVariable("userId") String uid
  ){
    return coinService.findCoinsForUser(uid);
  }

  @GetMapping("/api/users/{coinName}")
  public List<Coin> findUsersForCoin(
      @PathVariable("coinName") String cid
  ){
    return coinService.findUsersForCoin(cid);
  }


}
