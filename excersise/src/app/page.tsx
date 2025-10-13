"use client";

import React from "react";
import "./globals.css";

const todos = [
  { id: 1, text: "Complete online JavaScript course", completed: true },
  { id: 2, text: "Jog around the park 3x", completed: false },
  { id: 3, text: "10 minutes meditation", completed: false },
  { id: 4, text: "Read for 1 hour", completed: false },
  { id: 5, text: "Pick up groceries", completed: false },
  { id: 6, text: "Complete Todo App on Frontend Mentor", completed: false },
];

export default function Page() {
  return (
    <main className="todo-page">
      <div className="todo-banner">
        <div className="todo-header">
          <h1>TODO</h1>
          <div className="todo-theme-icon">🌙</div>
        </div>
      </div>

      <div className="todo-container">
        <div className="todo-input">
          <div className="circle"></div>
          <input type="text" placeholder="Create a new todo..." />
        </div>

        <div className="todo-list">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <div
                className={`circle ${todo.completed ? "circle-checked" : ""}`}
              >
                {todo.completed && <span className="checkmark">✓</span>}
              </div>
              <span>{todo.text}</span>
            </div>
          ))}

          <div className="todo-footer">
            <span>5 items left</span>
            <div className="filters">
              <span className="active">All</span>
              <span>Active</span>
              <span>Completed</span>
            </div>
            <span>Clear Completed</span>
          </div>
        </div>

        <p className="todo-reorder">Drag and drop to reorder list</p>
      </div>
    </main>
  );
}
