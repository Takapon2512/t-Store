import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

//MUI
import { 
    Typography,
    List,
    Card,
    CardContent,
    Box,
    IconButton
} from '@mui/material'

//CSS
import styles from './IncompleteTodos.module.scss'

//Recoil
import { useRecoilState } from 'recoil'
import { IncompleteTodosState } from '@/store/TaskState'

//Types
import { TaskType, UserDataType } from '@/Types/TaskTypes'

//Firebase
import { db } from '../../../libs/firebase'
import { 
    doc, 
    getDoc
} from 'firebase/firestore'

const IncompleteTodos = () => {
    const router = useRouter()
    const [incompleteTodos, setIncompleteTodos] = useRecoilState(IncompleteTodosState)

    const getIncompleteTodos = async () => {
        const currentUserName = localStorage.getItem('user') || ''

        const docRef = doc(db, `users/${currentUserName}`)
        const docSnap = await getDoc(docRef)
        const docData = docSnap.data()
        if (docData !== undefined) {
            const fb_IncompleteTodos: Array<TaskType> = docData.IncompleteTodos 
            setIncompleteTodos(fb_IncompleteTodos)
        } else {
            alert('未完了のタスクデータがありません')
        }
    }

    const HandleTaskDetail = (todo: TaskType) => {
        router.push({
            pathname: './Detail',
            query: `query=${todo.title}`
        })
        const jsonTodo = JSON.stringify(todo)
        localStorage.setItem('todo', jsonTodo)
    }


    useEffect(() => {
        getIncompleteTodos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [incompleteTodos])

    return (
        <>
        <Typography className={styles.task_title}>
            未着手
        </Typography>
            <List className={styles.task_List}>
                {
                    incompleteTodos.map((todo: TaskType) => (
                        <Card 
                        className={styles.task_Card} 
                        key={todo.id} 
                        component='li'
                        onClick={() => HandleTaskDetail(todo)}
                        >
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

export default IncompleteTodos