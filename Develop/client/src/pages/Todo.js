import React from "react";

import "../styles/todo.css";
export default function Todo() {
  return (
    <div className="Todo-list-container">
      <div className="Todo-list-wrapper">
        <div className="Todo-list-header">
          <h3 className="Todo-list-h">Todo List</h3>
          <div className="Todo-list-content">
            <div className="Todo-list">
              <p className="Todo-list-number">Todo List</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
