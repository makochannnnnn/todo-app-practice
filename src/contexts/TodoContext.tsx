"use client" //useStateを使うため
import React, {createContext,useContext,useState,ReactNode} from "react";
import {Item,Status} from "@/types/todo";

interface TodoContextType{
    tasks: Item[];
    addTask:(todo:Omit<Item,"id">)=>void;//
    deleteTask:(id:number)=>void;//数値型のidを引数とした関数を定義
    updateTask:(id:number,status:Status)=>void;
}

//新しいcontextを、TodoContextType型で定義し、初期値undefinedとする。
const TodoContext = createContext<TodoContextType|undefined>(undefined);

//子コンポーネントを引数としてプロバイダー（consumerが何を受け取るかの定義）を作る
export const TodoProvider = ({children}:{children:ReactNode})=>{
    //初期値[]として、Item[]を更新する関数を定義
    const [tasks,setTodos]=useState<Item[]>([]);

    const addTask = (newTaskData:Omit<Item,"id">)=>{
        const id = Date.now(); //現在のタイムスタンプをIDとして使用
        //id抜きのデータとidを合体させて新しいタスクを作成
        const newTask: Item={id,...newTaskData};
        //todos配列の最後に新しいタスクを追加する
        setTodos((Tasks)=>[...Tasks,newTask]);
    }

    const deleteTask = (id:number)=>{
        //指定されたidとidが等しくない要素だけを残して新しいタスクの配列を作る
        setTodos((Tasks)=>Tasks.filter((task)=>task.id !== id));
    };

    const updateTask=(id:number,status:Status)=>{
        //指定されたidとidが一致するタスクに対してはstatusを上書きし、そうでないタスクはそのまま
        setTodos((Tasks)=>Tasks.map((task)=>(task.id === id?{...task,status}:task)));
    };

    return(
        <TodoContext.Provider value={{tasks,addTask,deleteTask,updateTask}}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo=()=>{
    const context = useContext(TodoContext);
    if(context === undefined){
        throw new Error("useTodo must be used within a TodoProvider");
    }
    return context;
}