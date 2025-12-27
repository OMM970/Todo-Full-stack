package com.example.todolistapk.Dto;

import com.example.todolistapk.Enums.TaskStatus;
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
}
