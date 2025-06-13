'use client';
import { useTodo } from '@/contexts/TodoContext';
import TodoCard from './TodoCard';

const TodoList = () => {
  const { tasks } = useTodo();

  if (tasks.length === 0) {
    return (
      <p className="text-center text-white-500 text-xl mt-10">
        まだTODOが登録されていません。新しいTODOを作成しましょう！
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TodoCard key={task.id} task={task} />
      ))}
    </div>
  );
};
export default TodoList;

