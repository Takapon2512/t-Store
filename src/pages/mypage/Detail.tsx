import React, { useState } from 'react'
import { useRouter } from 'next/router';

//Mui
import { 
    Box,
    TextField,
    Button,
    Typography
} from '@mui/material'

//MuiIcons
import ListIcon from '@mui/icons-material/List';
import ArticleIcon from '@mui/icons-material/Article';

//Recoil
import { useRecoilState } from 'recoil';
import { 
    IncompleteTodosState,
    ProgressTodosState,
    CompleteTodosState
} from '@/store/TaskState';

//Firebase
import { db } from '../../../libs/firebase';
import { doc, setDoc } from 'firebase/firestore';

//Layout
import Layout from '@/components/layout/layout'

//CSS
import styles from './Detail.module.scss'

//Type
import { TaskType } from '@/Types/TaskTypes'

const Detail = () => {
    //Router
    const router = useRouter()

    //Recoil
    const [incompleteTodos, setIncompleteTodos] = useRecoilState(IncompleteTodosState)
    const [progressTodos, setProgressTodos] = useRecoilState(ProgressTodosState)
    const [completeTodos, setCompleteTodos] = useRecoilState(CompleteTodosState)

    let newTodo: TaskType = {
        id: '',
        title: '',
        state: '',
        year: '',
        month: '',
        date: '',
        comment: ''
    }

    //前の画面でクリックしたカードの情報を取り出す
    if (typeof localStorage !== 'undefined') {
        const jsonTodo = localStorage.getItem('todo') || ''
        const todo: TaskType = JSON.parse(jsonTodo)
        newTodo = todo
    }
    const [todoText, setTodoText] = useState(newTodo.title)

    //テキストフィールドの管理
    const handleTodoText = (e: React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value)
    
    //現在開いているタスクの状態（未着手・進行中・完了）を取得
    const todoStatus = newTodo.state

    //削除前のタスクと削除後のタスクを各配列に格納
    let prevIncompleteTodos: Array<TaskType> = []
    let newIncompleteTodos: Array<TaskType> = []
    
    let prevProgressTodos: Array<TaskType> = []
    let newProgressTodos: Array<TaskType> = []
    
    let prevCompleteTodos: Array<TaskType> = []
    let newCompleteTodos: Array<TaskType> = []

    //タスク一覧に戻るボタン
    const handleBack = () => {
        router.push('./Mypage')
    }

    //詳細画面アクセス後にタスク状態の背景色をつける
    //ボタンの要素
    if (typeof document !== 'undefined') {
        const incompleteEl = document.getElementById('incomplete-btn')
        const progressEl = document.getElementById('progress-btn')
        const completeEl = document.getElementById('complete-btn')

        switch (todoStatus) {
            case 'incomplete':
                incompleteEl?.classList.add("active")
                if (incompleteEl?.classList.contains('active')) incompleteEl.style.backgroundColor = 'rgb(240, 55, 22)'
                break
            case 'progress':
                progressEl?.classList.add("active")
                if (progressEl?.classList.contains('active')) progressEl.style.backgroundColor = 'rgb(31, 223, 31)'
                break
            case 'complete':
                completeEl?.classList.add("active")
                if (completeEl?.classList.contains('active')) completeEl.style.backgroundColor = 'rgb(237 206 23)'
                break
            default:
                break
        }
    }

    //タスクを削除し、一覧に戻る
    const HandleTaskDelete = async () => {

        //該当の状態にあるタスクは配列の何番目にあたるのかを調べる
        const todoId = newTodo.id
        const todoIdNumString = todoId.replace(/[^0-9]/g, '')
        const todoIdNum = Number(todoIdNumString)

        const currentUserName = localStorage.getItem('user') || ''

        switch (todoStatus) {
            case 'incomplete':
                prevIncompleteTodos = [...incompleteTodos]
                prevIncompleteTodos.splice(todoIdNum - 1, 1)

                newIncompleteTodos = prevIncompleteTodos.map((todo, index) => ({
                    id: `incomplete_${index + 1}`,
                    title: todo.title,
                    state: todo.state,
                    year: todo.year,
                    month: todo.month,
                    date: todo.date,
                    comment: todo.comment
                }))

                setIncompleteTodos(newIncompleteTodos)

            case 'progress':
                prevProgressTodos = [...progressTodos]

            case 'complete':
                prevCompleteTodos = [...completeTodos]

            default:
                break
        }

        //FireStoreに反映させる処理
        const docRef = doc(db, `users/${currentUserName}`)
        await setDoc(docRef, {
            IncompleteTodos: [...newIncompleteTodos],
            ProgressTodos: [...progressTodos],
            CompleteTodos: [...completeTodos]
        })

        //削除後にタスク一覧に戻る
        router.push('./Mypage')
    }

    const handleChangeStatus = (clickStatus: string) => {
        if (typeof document !== 'undefined') {
            //ボタンの要素
            const incompleteEl = document.getElementById('incomplete-btn')
            const progressEl = document.getElementById('progress-btn')
            const completeEl = document.getElementById('complete-btn')

            switch (clickStatus) {
                case 'incomplete':
                    incompleteEl?.classList.add("active")
                    if (incompleteEl?.classList.contains('active')) incompleteEl.style.backgroundColor = 'rgb(240, 55, 22)'
                    if (progressEl !== null) progressEl.removeAttribute('style')
                    if (completeEl !== null) completeEl.removeAttribute('style')
    
                    progressEl?.classList.remove("active")
                    completeEl?.classList.remove("active")
    
                    //未完了のタスクとして反映
                    const incompleteTodo: TaskType = {
                        id: `${clickStatus}_${incompleteTodos.length + 1}`,
                        title: newTodo.title,
                        state: clickStatus,
                        year: newTodo.year,
                        month: newTodo.month,
                        date: newTodo.date,
                        comment: newTodo.comment
                    }
    
                    console.log(incompleteTodo)
    
                break
                
                case 'progress':
                    progressEl?.classList.add("active")
                    if (progressEl?.classList.contains('active')) progressEl.style.backgroundColor = 'rgb(31, 223, 31)'
                    if (incompleteEl !== null) incompleteEl.removeAttribute('style')
                    if (completeEl !== null) completeEl.removeAttribute('style')
    
                    incompleteEl?.classList.remove("active")
                    completeEl?.classList.remove("active")
    
                    //進行中タスクとして反映
                    const newProgressTodo: TaskType = {
                        id: `${clickStatus}_${newProgressTodos.length + 1}`,
                        title: newTodo.title,
                        state: clickStatus,
                        year: newTodo.year,
                        month: newTodo.month,
                        date: newTodo.date,
                        comment: newTodo.comment
                    }

                    
    
                    console.log(newProgressTodo)
    
                break
                
                case 'complete':
                    completeEl?.classList.add("active")
                    if (completeEl?.classList.contains('active')) completeEl.style.backgroundColor = 'rgb(237 206 23)'
                    if (incompleteEl !== null) incompleteEl.removeAttribute('style')
                    if (progressEl !== null) progressEl.removeAttribute('style')
    
                    incompleteEl?.classList.remove("active")
                    progressEl?.classList.remove("active")
    
                    //完了タスクとして反映
                    const newCompleteTodo: TaskType = {
                        id: `${clickStatus}_${newCompleteTodos.length + 1}`,
                        title: newTodo.title,
                        state: clickStatus,
                        year: newTodo.year,
                        month: newTodo.month,
                        date: newTodo.date,
                        comment: newTodo.comment
                    }
    
                    console.log(newCompleteTodo)
    
                break
    
                default:
                    break
            }
        }
    }

    //編集したタスクを保存
    const handleEditTask = () => {
        console.log(newTodo)
    }

    return (
        <Layout>
            <Box className={styles.detailContainer}>
                <TextField 
                variant='standard' 
                value={todoText}
                onChange={handleTodoText}
                className={styles.detail_title}
                />
                <Box className={styles.detail_stateContainer}>
                    <Box className={styles.detail_stateTitle}>
                        <ListIcon />
                        <Typography 
                        variant='h6'
                        className={styles.detail_subtitle}
                        >
                            タスクの状態
                        </Typography>
                    </Box>
                    <Box className={styles.detail_buttons}>
                        <Button 
                        id='incomplete-btn'
                        className={styles.detail_incomplete}
                        onClick={() => handleChangeStatus('incomplete')}
                        >
                            未着手
                        </Button>
                        <Button 
                        id='progress-btn'
                        className={styles.detail_progress}
                        onClick={() => handleChangeStatus('progress')}
                        >
                            進行中
                        </Button>
                        <Button
                        id='complete-btn'
                        className={styles.detail_complete}
                        onClick={() => handleChangeStatus('complete')}
                        >
                            完了
                        </Button>
                    </Box>
                </Box>
                <Box className={styles.detail_commentContainer}>
                    <Box className={styles.detail_commentTitle}>
                        <ArticleIcon />
                        <Typography 
                        variant='h6'
                        className={styles.detail_subtitle}
                        >
                            タスクの詳細
                        </Typography>
                    </Box>
                    <TextField 
                    fullWidth
                    multiline
                    maxRows={8}
                    className={styles.detail_comment}
                    />
                </Box>
                <Box className={styles.detail_actionButtons}>
                    <Button 
                    className={styles.detail_setting}
                    onClick={handleEditTask}
                    >
                        タスク設定
                    </Button>
                    <Button
                    className={styles.detail_delete}
                    onClick={HandleTaskDelete}
                    >
                        タスク削除
                    </Button>
                    <Button 
                    className={styles.detail_back}
                    onClick={handleBack}
                    >
                        戻る
                    </Button>
                </Box>
            </Box>
        </Layout>
    )
}

export default Detail