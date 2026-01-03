package com.example.todolistapk.UserManagementService.UserControlle;

import com.example.todolistapk.UserManagementService.USerDto.loginReqDto;
import com.example.todolistapk.UserManagementService.USerDto.loginResDto;
import com.example.todolistapk.UserManagementService.USerDto.userReqDto;
import com.example.todolistapk.UserManagementService.USerDto.userResDto;
import com.example.todolistapk.UserManagementService.UserService.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<userResDto> registerUser(@RequestBody userReqDto userReqDto) {
      return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(userReqDto));
    }

    @PostMapping("/login")
    public ResponseEntity<loginResDto> loginUser(@RequestBody loginReqDto loginReqDto) {
        return ResponseEntity.ok(userService.loginUser(loginReqDto));
    }
}
