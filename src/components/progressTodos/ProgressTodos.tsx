import React, { useEffect } from 'react'

//MUI
import { 
    Typography,
    List,
    Card,
    CardContent
} from '@mui/material'

//CSS
import styles from './ProgressTodos.module.scss'

//Recoil
import { useRecoilState } from 'recoil'
import { ProgressTodosState } from '@/store/TaskState'
import { userNameState } from '@/store/AuthState'

//Type
import { TaskType, UserDataType } from '@/Types/TaskTypes'

//Firebase
import { db } from '../../../libs/firebase'
import { 
  doc,
  getDoc
} from 'firebase/firestore'

const ProgressTodos = () => {
  const [progressTodos, setProgressTodos] = useRecoilState(ProgressTodosState)

  const getProgressTodos = async () => {
    const currentUserName = localStorage.getItem('user') || ''

    const docRef = doc(db, `users/${currentUserName}`)
    const docSnap = await getDoc(docRef)
    const docData = docSnap.data()
    if (docData !== undefined) {
      const fb_ProgressTodos: Array<TaskType> = docData.ProgressTodos
      setProgressTodos(fb_ProgressTodos)
    } else {
      alert('進行中のタスクデータがありません')
    }
  }

  useEffect(() => {
    getProgressTodos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressTodos])

  return (
    <>
    <Typography className={styles.task_title}>
        進行中
    </Typography>
    <List className={styles.task_List}>
      {
        progressTodos.map((todo: TaskType) => (
          <Card className={styles.task_Card} key={todo.id} component='li'>
            <CardContent className={styles.task_CardContent}>
              {todo.title}
            </CardContent>
         </Card>
        ))
      }
    
    </List>
    </>
  )
}

export default ProgressTodos