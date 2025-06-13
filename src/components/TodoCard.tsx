import { Item, Status } from '@/types/todo';
import { useTodo } from '@/contexts/TodoContext';
import { FaUser, FaCalendarAlt, FaChevronDown, FaTrash } from 'react-icons/fa'; // FaTrash をインポート

const TodoCard = ({ task }: { task: Item }) => {
const { deleteTask, updateTask } = useTodo();
const today = new Date();
today.setHours(0, 0, 0, 0);
const isDead = new Date(task.deadline) < today;

const statusColors = (status: Status) => {
    switch (status) {
        case '未着手': return 'bg-gray-200 text-gray-800';
        case '進行中': return 'bg-blue-200 text-blue-800';
        case '完了': return 'bg-green-200 text-green-800';
        default: return 'bg-gray-200 text-gray-800';
    }
};

return (
    <div className={`group relative bg-white p-6 rounded-lg shadow-md border ${isDead ? 'border-red-500 border-[5px]' : 'border-gray-200'} transition-all duration-200 hover:shadow-lg`}>

        <h3 className='text-black text-xl font-semibold mb-2'>{task.title}</h3>

        <p className='text-gray-700 mb-1 flex items-center'>
            <FaUser className="mr-2 text-gray-500" />
            担当者：{task.assignee}
        </p>

        <p className="text-gray-700 mb-4 flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-500" />
            締切日: {task.deadline}
            {isDead && (
            <span className='bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
                期限切れ
            </span>
            )}
        </p>

        <div className="relative inline-block mb-4">
            <select
                value={task.status}
                onChange={(e) => updateTask(task.id, e.target.value as Status)}
                className={`appearance-none inline-block w-full pl-4 pr-10 py-1 rounded-full text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${statusColors(task.status)}`}
            >
                <option value="未着手" className="bg-gray-200 text-gray-800">未着手</option>
                <option value="進行中" className="bg-blue-200 text-blue-800">進行中</option>
                <option value="完了" className="bg-green-200 text-green-800">完了</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <FaChevronDown className={`h-3 w-3 ${statusColors(task.status).split(' ')[1]}`} />
            </div>
        </div>

        {task.content && (
            <div className='bg-gray-100 p-3 rounded-md mt-4 text-gray-800 text-sm'>
                <h4 className='font-semibold mb-1'>内容：</h4>
                <p className='whitespace-pre-wrap'>{task.content}</p>
            </div>
        )}

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
                onClick={() => deleteTask(task.id)}
                className='bg-red-400 hover:bg-red-500 text-white font-bold p-2 rounded-full shadow-md'
            >
                <FaTrash className="h-4 w-4" />
            </button>
        </div>
    </div>
);
};

export default TodoCard;