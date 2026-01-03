package com.example.todolistapk.UserManagementService.USerDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class userReqDto {
    private String username;
    private String password;
    private String email;
    private String confirmPassword;

}
