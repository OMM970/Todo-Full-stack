package com.example.todolistapk.Repository;

import com.example.todolistapk.Entity.todoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TodoRepo extends JpaRepository<todoEntity,Integer> {
    Optional<todoEntity> findByTaskname(String taskname);

    Optional<todoEntity> findById(Long id);

    todoEntity deleteById(long todoId);
}
