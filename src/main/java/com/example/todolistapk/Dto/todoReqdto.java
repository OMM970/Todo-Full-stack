package com.example.todolistapk.Dto;

import com.example.todolistapk.Enums.TaskPriority;
import com.example.todolistapk.Enums.TaskStatus;
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
