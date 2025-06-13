'use client'

import {useState} from 'react';
import TodoForm from './TodoForm';//フォーム表示機能のインポート

const TodoFormToggle = () =>{
    const[isFormVisible,setIsFormVisible]=useState(false);//新規作成画面の可視/不可視

    const toggleForm = () => {
        //可視/不可視の反転
        setIsFormVisible((isVisible)=>!isVisible);
    };

    const formCancel = () =>{
        //キャンセル時、不可視化
        setIsFormVisible(false);
    }

    return(
        <div className='mb-6'>
            {/*可視時は新規作成ボタン表示*/}
            {!isFormVisible && (
                <button
                    onClick={toggleForm}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    新規タスク作成
                </button>
            )}
            {/*不可視時は新規タスクフォーム表示*/}
            {isFormVisible && (
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <TodoForm onCancel={formCancel}/>
                </div>
            )}
        </div>
    );
};

export default TodoFormToggle;