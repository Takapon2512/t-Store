import React from 'react'

//MUI
import { 
    Stack 
} from '@mui/material'

//CSS
import styles from './TasksContainer.module.scss'

const TasksContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <Stack className={styles.task_Stack}>
        {children}
    </Stack>
  )
}

export default TasksContainer