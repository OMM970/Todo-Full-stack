package com.example.todolistapk.UserManagementService.USerDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class loginReqDto {
    private String email;
    private String password;
}
