import React, { useState, useEffect } from 'react'

//MUI
import { 
    Box,
    Typography,
    Paper,
    TextField
} from '@mui/material'

//Icon
import { TaskOutlined } from '@mui/icons-material'

//CSS
import styles from './Input.module.scss'

//Recoil
import { useRecoilState } from 'recoil'
import { 
  IncompleteTodosState, 
  ProgressTodosState,
  CompleteTodosState
} from '@/store/TaskState'

//Types
import { TaskType } from '@/Types/TaskTypes'

//Firebase
import { db } from '../../../libs/firebase'
import { 
  collection, 
  doc, 
  getDoc,  
  deleteDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore'

const Input = () => {
  //入力した値を管理
  const [inputTodo, setInputTodo] = useState('')

  //Recoil
  const [incompleteTodos, setIncompleteTodos] = useRecoilState(IncompleteTodosState)
  const [progressTodos, setProgressTodos] = useRecoilState(ProgressTodosState)
  const [completeTodos, setCompleteTodos] = useRecoilState(CompleteTodosState)

  //入力した値をinputTodoに保存
  const handleInputTodo = (e: React.ChangeEvent<HTMLInputElement>) => setInputTodo(e.target.value)

  //タスクを追加する処理
  const HandleAddTask = async (key: string) => {
    //時間取得
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()

    //Enterキーを押したときの処理
    if (key === 'Enter' && inputTodo !== '') {

      const newTodo: TaskType = {
        id: `incomplete_${incompleteTodos.length + 1}`,
        title: inputTodo,
        state: 'incomplete',
        year: `${year}`,
        month: `${month}`,
        date: `${date}`,
        comment: ''
      }

      //Firebaseのデータベースを更新
      const currentUserName = localStorage.getItem('user') || ''

      const docRef = doc(db, `users/${currentUserName}`)
      await setDoc(docRef, {
        IncompleteTodos: [...incompleteTodos, newTodo],
        ProgressTodos: [...progressTodos],
        CompleteTodos: [...completeTodos]
      })
      
      setInputTodo('')
    }
  }

  return (
    <Box className={styles.input_wrapper}>
        <Box className={styles.app_titleContainer}>
        <TaskOutlined fontSize='large' className={styles.app_titleIcon} />
        <Typography variant='h2' className={styles.app_title}>
          タスク管理
        </Typography>
      </Box>
      <Paper className={styles.input_container}>
        <TextField
        label='タスク入力後にEnter'
        fullWidth
        onChange={handleInputTodo}
        onKeyDown={(e) => HandleAddTask(e.key)}
        value={inputTodo}
        />
      </Paper>
    </Box>
  )
}

export default Input