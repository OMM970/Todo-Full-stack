package com.example.todolistapk.UserManagementService.UserEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "UserDb",uniqueConstraints = {
        @UniqueConstraint(columnNames = "user_email")
})
public class UserEntitiy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_fullname")
    private String username;

    @Column(name = "user_email")
    private String email;

    @Column(name="user_password")
    private String password;

    @Column(name = "user_confirmPasword")
    private String confirmPassword;


}
