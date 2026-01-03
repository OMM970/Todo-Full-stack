package com.example.todolistapk.Todo.Serviceimpl.Dto;

import com.example.todolistapk.Todo.Serviceimpl.Enums.TaskPriority;
import com.example.todolistapk.Todo.Serviceimpl.Enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class todoResdto {
   private Long id;
   private String Taskname;
   private String Taskdescription;
   private TaskStatus status;
   private TaskPriority priority;
}
