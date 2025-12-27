package com.example.todolistapk.Serviceimpl;

import com.example.todolistapk.Dto.todoReqdto;
import com.example.todolistapk.Dto.todoResdto;
import com.example.todolistapk.Entity.todoEntity;

import java.util.List;

public interface Service {
    todoResdto addtask(todoReqdto todoReqdto);

    todoResdto mapToDto(todoEntity todoEntity);

    List<todoResdto> getallTodo();

    todoResdto getTodoById(Long todoId);

    todoResdto gettodoByname(String taskname);

    String deleteTodoname(long todoId);

    todoResdto updateTodo(todoReqdto todoReqdto, Long todoId);
}
