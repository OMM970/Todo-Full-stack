package com.example.todolistapk.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class todoReqdto {
    String Taskname;
    String Taskdescription;
}
