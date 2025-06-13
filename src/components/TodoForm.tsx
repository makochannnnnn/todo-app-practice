'use client'
//クライアント側での処理が必要だから？

import {useForm,SubmitHandler} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Item,Status} from '@/types/todo';
import { useTodo } from '@/contexts/TodoContext';

//バリデーションスキーマ(入力される内容が規則に反していないかの検証)
const todoSchema = z.object({
    title:z.string().min(1,{message:'タイトルは必須です'}),
    assignee:z.string().min(1,{message:'担当者名は必須です'}),
    deadline:z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: '締切日はYYYY-MM-DD形式で入力してください' }),
    status:z.enum(['完了','進行中','未着手']).default('未着手'),
    content:z.string().optional(),
});
//スキーマを通過したデータの型を定義
type TodoFormData = z.infer<typeof todoSchema>;

const TodoForm = ({onCancel}: {onCancel: ()=>void}) =>{
    //contextのaddteskを取り出す
    const {addTask} = useTodo();
    //フォームの状態管理に必要なものを呼び出し、バリデーションスキーマ、ステータスの初期値を設定
    const {register,handleSubmit,reset,formState:{errors}}=useForm<TodoFormData>({
        resolver: zodResolver(todoSchema),
        defaultValues:{
          title: "",
          assignee: "",
          deadline: "",
          status:'未着手',
          content: "",
        },
        mode: 'onBlur', // フォームの入力がblur（フォーカスが外れた）時にバリデーションを実行
    });

    //dataの方をTodoFormDataと定義し、タスクを追加後、入力フォームのリセットと削除
    const onSubmit: SubmitHandler<TodoFormData> = (data) =>{
        addTask(data);
        reset();
        onCancel();
    };

  return (
    //フォームの表示
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">タイトル（必須）</label>
        <input
          id="title"
          
          {...register('title')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">担当者名（必須）</label>
        <input
          id="assignee"
          {...register('assignee')}
          className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.assignee && <p className="text-red-500 text-sm">{errors.assignee.message}</p>}
      </div>

      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">締切日（必須）</label>
        <input
          type="date" // 日付ピッカーを表示
          id="deadline"
          {...register('deadline')}
          className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline.message}</p>}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">ステータス</label>
        <select
          id="status"
          {...register('status')}
          className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="未着手">未着手</option>
          <option value="進行中">進行中</option>
          <option value="完了">完了</option>
        </select>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">内容（任意）</label>
        <textarea
          id="content"
          {...register('content')}
          rows={3}
          className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-all duration-200"
        >
          作成
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-all duration-200"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
};

export default TodoForm;