package com.example.todolistapk.Todo.Serviceimpl;

import com.example.todolistapk.Todo.Serviceimpl.Dto.todoReqdto;
import com.example.todolistapk.Todo.Serviceimpl.Dto.todoResdto;
import com.example.todolistapk.Todo.Serviceimpl.Entity.todoEntity;
import com.example.todolistapk.Todo.Serviceimpl.Enums.TaskPriority;
import com.example.todolistapk.Todo.Serviceimpl.Enums.TaskStatus;

import java.util.List;

public interface Service {
    todoResdto addtask(todoReqdto todoReqdto);

    todoResdto mapToDto(todoEntity todoEntity);

    List<todoResdto> getallTodo();

    todoResdto getTodoById(Long todoId);

    todoResdto gettodoByname(String taskname);

    String deleteTodoname(Long todoId);

    todoResdto updateTodo(todoReqdto todoReqdto, Long todoId);

    todoResdto updateTodoStatus(Long todoId, TaskStatus status);

    todoResdto updateTodoPriority(Long todoId, TaskPriority priority);
}
