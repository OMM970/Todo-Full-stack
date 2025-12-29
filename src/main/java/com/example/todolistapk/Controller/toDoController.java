package com.example.todolistapk.Controller;

import com.example.todolistapk.Dto.todoReqdto;
import com.example.todolistapk.Dto.todoResdto;
import com.example.todolistapk.Enums.TaskStatus;
import com.example.todolistapk.Serviceimpl.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/todos")
@RequiredArgsConstructor
public class toDoController {
    private final Service service;



    @GetMapping()
    public ResponseEntity<List<todoResdto>> getAllTodos() {
        return ResponseEntity.ok(service.getallTodo());
    }


    @PostMapping()
    public ResponseEntity<todoResdto> addTodo(@RequestBody todoReqdto todoReqdto) {
        return ResponseEntity.status(201)
                .body(service.addtask(todoReqdto));
    }

    @GetMapping("/all")
    public ResponseEntity<List<todoResdto>> findTodo() {
        return ResponseEntity.ok(service.getallTodo());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable long id) {
        return ResponseEntity.ok(service.deleteTodoname(id));
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<todoResdto> updateTodo(@PathVariable long id, @RequestBody todoReqdto todoReqdto) {
        return ResponseEntity.ok().body(service.updateTodo(todoReqdto,id));
    }

    @PutMapping("/update/status/{id}")
    public ResponseEntity<todoResdto> updateTodoStatus(
            @PathVariable long id,
            @RequestBody Map<String, TaskStatus> body
    ) {
        TaskStatus status = body.get("status");
        return ResponseEntity.ok(service.updateTodoStatus(id, status));
    }





}
