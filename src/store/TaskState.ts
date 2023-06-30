import { atom } from "recoil";
import { TaskType } from "@/Types/TaskTypes";

//IncompleteTodoの配列の状態管理
export const IncompleteTodosState = atom<TaskType[]>({
    key: 'IncompleteTodosState',
    default: []
})

//ProgressTodoの配列の状態管理
export const ProgressTodosState = atom<TaskType[]>({
    key: 'ProgressTodosState',
    default: []
})

//CompleteTodoの配列の状態管理
export const CompleteTodosState = atom<TaskType[]>({
    key: 'CompleteTodosState',
    default: []
})

//TaskDetailの状態管理
export const editTodoState = atom<TaskType>({
    key: 'editTodoState',
    default: {
        id: '',
        title: '',
        state: '',
        year: '',
        month: '',
        date: '',
        comment: ''
    }
})