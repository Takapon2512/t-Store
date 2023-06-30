import React, { useEffect } from 'react'

//MUI
import { 
    Typography,
    List,
    Card,
    CardContent
} from '@mui/material'

//CSS
import styles from './CompleteTodos.module.scss'

//Recoil
import { useRecoilState } from 'recoil'
import { CompleteTodosState } from '@/store/TaskState'

//Types
import { TaskType } from '@/Types/TaskTypes'

//Firebase
import { db } from '../../../libs/firebase'
import { 
  doc,
  getDoc
} from 'firebase/firestore'

const CompleteTodos = () => {
  const [completeTodos, setCompleteTodos] = useRecoilState(CompleteTodosState)

  const getCompleteTodos = async () => {
    const currentUserName = localStorage.getItem('user') || ''

    const docRef = doc(db, `users/${currentUserName}`)
    const docSnap = await getDoc(docRef)
    const docData = docSnap.data()
    if (docData !== undefined) {
      const fb_CompleteTodos: Array<TaskType> = docData.CompleteTodos
      setCompleteTodos(fb_CompleteTodos)
    } else {
      alert('完了したタスクのデータがありません')
    }

  }

  useEffect(() => {
    getCompleteTodos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completeTodos])

  return (
    <>
    <Typography className={styles.task_title}>
        完了
    </Typography>
    <List className={styles.task_List}>
      {
        completeTodos.map((todo: TaskType) => (
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

export default CompleteTodos