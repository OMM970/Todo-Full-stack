package com.example.todolistapk.Entity;

import com.example.todolistapk.Enums.TaskStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "Todo")
public class todoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(name = "todo_title")
    private String Taskname;
    @Column(name = "todo_description")
   private String Taskdescription;
    @Column(name = "todo_status")
    @Enumerated(EnumType.STRING)
    private TaskStatus status;


}
