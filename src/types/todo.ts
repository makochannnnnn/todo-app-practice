//ユニオン型で定義し、指定された値以外を代入不可にする
export type Status = '完了'|'進行中'|'未着手';

export interface Item{
    id:number;//各タスクに振り分けられるID
    title: string;//タスクタイトル
    assignee: string;//担当者
    deadline: string;//YYYY-MM-DD形式の期限
    status: Status;//タスク進行状況
    content?: string;//内容の詳細
}