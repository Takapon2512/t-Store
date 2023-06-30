import React from 'react'
import { useRouter } from 'next/router'

//Firebase
import app from '../../../libs/firebase'
import { signOut, getAuth } from 'firebase/auth'

//MUI
import { Button } from '@mui/material'

//Layout
import Layout from '@/components/layout/layout'

//CSS
import styles from './Mypage.module.scss'

//Component
import Input from '@/components/input/Input'
import TaskListMenu from '@/components/taskListMenu/TaskListMenu'
import Tasks from '@/components/tasks/Tasks'
import TasksContainer from '@/components/tasksContainer/TasksContainer'
import IncompleteTodos from '@/components/incompleteTodos/IncompleteTodos'
import ProgressTodos from '@/components/progressTodos/ProgressTodos'
import CompleteTodos from '@/components/completeTodos/CompleteTodos'

const Mypage = () => {
  //auth
  const auth = getAuth(app)

  //Router
  const router = useRouter()

  //ログアウト処理
  const logOut = async () => {
    await signOut(auth)
    router.push('/')
  }

  return (
    <Layout>
      <Input />
      <TaskListMenu />
      <Tasks>
        <TasksContainer>
          <IncompleteTodos />
        </TasksContainer>
        <TasksContainer>
          <ProgressTodos />
        </TasksContainer>
        <TasksContainer>
          <CompleteTodos />
        </TasksContainer>
      </Tasks>
      <Button 
      variant='contained' 
      color='secondary'
      onClick={logOut}
      >
        ログアウト
      </Button>
    </Layout>
  )
}

export default Mypage