package com.example.todolistapk.Serviceimpl;

import com.example.todolistapk.Dto.todoReqdto;
import com.example.todolistapk.Dto.todoResdto;
import com.example.todolistapk.Entity.todoEntity;
import com.example.todolistapk.Enums.TaskStatus;
import com.example.todolistapk.Repository.TodoRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class seviceImpl implements Service {
    private final TodoRepo  todoRepo;


    @Override
    public todoResdto addtask(todoReqdto todoReqdto) {
        todoEntity todoEntity = new todoEntity();
        todoEntity.setTaskname(todoReqdto.getTaskname());
        todoEntity.setTaskdescription(todoReqdto.getTaskdescription());
        todoEntity.setStatus(TaskStatus.TODO);
        todoEntity saved = todoRepo.save(todoEntity);
        return mapToDto(saved);
    }

    @Override
    public todoResdto mapToDto(todoEntity todoEntity) {
        todoResdto todoResdto = new todoResdto();
        todoResdto.setId(todoEntity.getId());
        todoResdto.setTaskname(todoEntity.getTaskname());
        todoResdto.setTaskdescription(todoEntity.getTaskdescription());
        todoResdto.setStatus(todoEntity.getStatus());
        return todoResdto;
    }

    @Override
    public List<todoResdto> getallTodo() {
        return todoRepo.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());

    }

    @Override
    public todoResdto getTodoById(Long todoId) {
        todoEntity todoEntity = todoRepo.findById(todoId).orElseThrow(()->new RuntimeException("Task not Found"));
        return mapToDto(todoEntity);
    }

    @Override
    public todoResdto gettodoByname(String taskname) {
        todoEntity todoEntity = todoRepo.findByTaskname(taskname).orElseThrow(()->new RuntimeException("Task not Avialable"));
        return mapToDto(todoEntity);
    }

    @Override
    @Transactional
    public String deleteTodoname(long todoId) {
        if(!todoRepo.findById(todoId).isPresent()) {
            throw new RuntimeException("Task not Avialable");
        }
        todoRepo.deleteById(todoId);
        return "Task removed successfully";

    }

    @Override
    @Transactional
    public todoResdto updateTodo(todoReqdto todoReqdto, Long todoId) {
        todoEntity todoEntity = todoRepo.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Task not Available"));
        todoEntity.setTaskname(todoReqdto.getTaskname());
        todoEntity.setTaskdescription(todoReqdto.getTaskdescription());
      if(todoReqdto.getStatus() !=null) {
          todoEntity.setStatus(todoReqdto.getStatus());
      }
      return mapToDto(todoEntity);
    }

    @Override
    public todoResdto updateTodoStatus(Long todoId, TaskStatus status) {
        todoEntity todoEntity=todoRepo.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Task not Available"));
        todoEntity.setStatus(status);
        todoEntity saved = todoRepo.save(todoEntity);
        return mapToDto(saved);
    }


}
