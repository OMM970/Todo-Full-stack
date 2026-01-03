package com.example.todolistapk.UserManagementService.UserRepo;

import com.example.todolistapk.UserManagementService.UserEntity.UserEntitiy;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface USerRepo extends JpaRepository<UserEntitiy,Integer> {
    Optional<UserEntitiy> findByEmail(String email);
}
