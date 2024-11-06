import React, { useState } from "react";
import "./App.css";


type Todo = {
  title: string;
  content: string;
  id: number;
  checked: boolean;
};

function App() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };


  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      return;
    }

    const newTodo: Todo = {
      title,
      content,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setTitle("");
    setContent("");
  };


  const handleEdit = (id: number, field: "title" | "content", value: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo[field] = value;
      }
      return todo;
    });

    setTodos(newTodos);
  };


  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  
  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h1 className="text-red-500">Todoリスト 課題</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="title" className="block">題名：</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="inputText"
            />
          </div>
          <div>
            <label htmlFor="content" className="block">内容：</label>
            <input
              id="content"
              type="text"
              value={content}
              onChange={handleContentChange}
              className="inputText"
            />
          </div>
          <input
            type="submit"
            value="作成"
            className="submitButton"
          />
        </form>

        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id} className="todoItem">
              <div>
                <strong>タイトル:</strong>
                <input
                  type="text"
                  value={todo.title}
                  onChange={(e) => handleEdit(todo.id, "title", e.target.value)}
                  disabled={todo.checked}
                  className="inputText"
                />
              </div>
              <div>
                <strong>内容:</strong>
                <input
                  type="text"
                  value={todo.content}
                  onChange={(e) => handleEdit(todo.id, "content", e.target.value)}
                  disabled={todo.checked}
                  className="inputText"
                />
              </div>
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleChecked(todo.id, todo.checked)}
                className="checkbox"
              />
              <button onClick={() => handleDelete(todo.id)} className="deleteButton">削除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;