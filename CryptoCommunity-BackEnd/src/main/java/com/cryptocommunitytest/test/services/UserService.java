package com.cryptocommunitytest.test.services;

import com.cryptocommunitytest.test.models.AdminUserJoined;
import com.cryptocommunitytest.test.models.BaseUserJoined;
import com.cryptocommunitytest.test.models.NormalUserJoined;
import com.cryptocommunitytest.test.repositories.AdminUserRepository;
import com.cryptocommunitytest.test.repositories.BaseUserRepository;
import com.cryptocommunitytest.test.repositories.NormalUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  BaseUserRepository baseRepo;
  @Autowired
  NormalUserRepository normalRepo;
  @Autowired
  AdminUserRepository adminRepo;


  public BaseUserJoined createBaseUser(BaseUserJoined user) {
    return baseRepo.save(user);
  }

  public NormalUserJoined createNormalUser(NormalUserJoined user) {
    return normalRepo.save(user);
  }

  public BaseUserJoined findUser(String username, String password) {
    return baseRepo.findUserByCredentials(username, password);
  }

  public BaseUserJoined findUserByUsername(String username) {
    if(baseRepo.findUserByUserName(username) == null) {
      System.out.println("got here"+ username);
      return baseRepo.findUserByUserName("BadUser");
    } else {
      return baseRepo.findUserByUserName(username);
    }
  }

  public boolean checkIfAdmin(String username) {
    AdminUserJoined adminUser;
    adminUser = adminRepo.findByUid(baseRepo.findUserByUserName(username).getId());
    if(adminUser == null){
      return false;
    } else {
      return true;
    }
  }

  public Integer makeAdmin(String username) {
    BaseUserJoined user = findUserByUsername(username);
    Long id = user.getId();
    String password = user.getPassword();
    AdminUserJoined newAdmin = new AdminUserJoined(id, 0, username, password);
    normalRepo.deleteById(id);
    adminRepo.save(newAdmin);
    return 1;
  }

  public BaseUserJoined updateUsername(String userId, String newUid) {
    BaseUserJoined originalUser = baseRepo.findUserByUserName(userId);
    originalUser.setUsername(newUid);
    baseRepo.save(originalUser);
    return originalUser;
  }
}
