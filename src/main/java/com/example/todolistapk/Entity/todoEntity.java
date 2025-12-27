package com.example.todolistapk.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="Todo")
public class todoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long Id;

@Column(name = "todo_title")
    String Taskname;
@Column(name = "todo_description")
    String Taskdescription;



}
