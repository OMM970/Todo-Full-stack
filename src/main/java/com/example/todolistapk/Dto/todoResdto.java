package com.example.todolistapk.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class todoResdto {
    Long id;
    String Taskname;
    String Taskdescription;
}
