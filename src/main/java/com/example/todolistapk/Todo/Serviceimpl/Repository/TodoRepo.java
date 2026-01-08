package com.example.todolistapk.Todo.Serviceimpl.Repository;

import com.example.todolistapk.Todo.Serviceimpl.Entity.todoEntity;
import com.example.todolistapk.UserManagementService.UserEntity.UserEntitiy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TodoRepo extends JpaRepository<todoEntity,Integer> {
    Optional<todoEntity> findByTaskname(String taskname);

    Optional<todoEntity> findById(Long id);

    todoEntity deleteById(long todoId);

    List<todoEntity> findByUserEntitiy(UserEntitiy  userEntitiy);
}
