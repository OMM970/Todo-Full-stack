package com.example.todolistapk.UserManagementService.UserService;

import com.example.todolistapk.UserManagementService.USerDto.loginReqDto;
import com.example.todolistapk.UserManagementService.USerDto.loginResDto;
import com.example.todolistapk.UserManagementService.USerDto.userReqDto;
import com.example.todolistapk.UserManagementService.USerDto.userResDto;
import com.example.todolistapk.UserManagementService.UserEntity.UserEntitiy;

public interface UserService {
    userResDto registerUser(userReqDto userReqDto);

    userResDto mapToDto(UserEntitiy userEntitiy);

    loginResDto loginUser(loginReqDto loginReqDto);
}
