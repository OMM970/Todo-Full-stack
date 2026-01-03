package com.example.todolistapk.Todo.Serviceimpl.Dto;

import com.example.todolistapk.Todo.Serviceimpl.Enums.TaskPriority;
import com.example.todolistapk.Todo.Serviceimpl.Enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class todoReqdto {
    private String Taskname;
    private String Taskdescription;
    private TaskStatus status;
    private TaskPriority priority;
}
