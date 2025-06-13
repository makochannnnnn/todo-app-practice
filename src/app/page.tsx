import React from 'react';
import { useTodo } from '@/contexts/TodoContext'; // Client ComponentであるuseTodoをインポート
import TodoFormToggle from '@/components/TodoFormToggle'; // Client Componentとして作成
import TodoList from '@/components/TodoList'; // Client Componentとして作成

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <TodoFormToggle />
      <TodoList /> 
    </div>
  );
}