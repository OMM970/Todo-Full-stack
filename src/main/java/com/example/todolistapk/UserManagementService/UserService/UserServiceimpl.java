package com.example.todolistapk.UserManagementService.UserService;

import com.example.todolistapk.UserManagementService.Security.JwtUtil;
import com.example.todolistapk.UserManagementService.USerDto.loginReqDto;
import com.example.todolistapk.UserManagementService.USerDto.loginResDto;
import com.example.todolistapk.UserManagementService.USerDto.userReqDto;
import com.example.todolistapk.UserManagementService.USerDto.userResDto;
import com.example.todolistapk.UserManagementService.UserEntity.UserEntitiy;
import com.example.todolistapk.UserManagementService.UserRepo.USerRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.cache.spi.RegionFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.UnmappableCharacterException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceimpl implements UserService {
    private final USerRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    public static final String EMAIL="^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    public static final String PASSWORD="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$\n";

    @Override
    public userResDto registerUser(userReqDto userReqDto) {

        log.error("===== REGISTER USER DEBUG =====");
        log.error("EMAIL           : '{}'", userReqDto.getEmail());
        log.error("USERNAME        : '{}'", userReqDto.getUsername());
        log.error("PASSWORD        : '{}'", userReqDto.getPassword());
        log.error("CONFIRM PASSWORD: '{}'", userReqDto.getConfirmPassword());

        if (userReqDto.getPassword() == null || userReqDto.getConfirmPassword() == null) {
            log.error("❌ One of the password fields is NULL");
            throw new IllegalArgumentException("Password fields cannot be null");
        }

        if (!userReqDto.getPassword().trim()
                .equals(userReqDto.getConfirmPassword().trim())) {

            log.error("❌ PASSWORD MISMATCH AFTER TRIM");
            log.error("PWD LEN : {}", userReqDto.getPassword().length());
            log.error("CPWD LEN: {}", userReqDto.getConfirmPassword().length());

            throw new IllegalArgumentException("Passwords do not match");
        }

        UserEntitiy userEntitiy = new UserEntitiy();

        if (!userReqDto.getEmail().matches(EMAIL)) {
            throw new RuntimeException("Invalid email address");
        }

        userEntitiy.setEmail(userReqDto.getEmail());
        userEntitiy.setUsername(userReqDto.getUsername());
        userEntitiy.setPassword(
                passwordEncoder.encode(userReqDto.getPassword().trim())
        );

        UserEntitiy saved = userRepo.save(userEntitiy);
        return mapToDto(saved);
    }


    @Override
    public userResDto mapToDto(UserEntitiy userEntitiy) {
        userResDto userResDto = new userResDto();
        userResDto.setUserEmail(userEntitiy.getEmail());
        userResDto.setUserName(userEntitiy.getUsername());
        userResDto.setUserId(userEntitiy.getId());
        return userResDto;

    }

    @Override
    public loginResDto loginUser(loginReqDto loginReqDto) {
       UserEntitiy user = userRepo.findByEmail(loginReqDto.getEmail())
               .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

       if(!passwordEncoder.matches(loginReqDto.getPassword(),user.getPassword())){
           throw new UsernameNotFoundException("Wrong password");
       }
       String token = jwtUtil.generateToken(user.getEmail(), user.getId());
       return new loginResDto(token);
    }




}
