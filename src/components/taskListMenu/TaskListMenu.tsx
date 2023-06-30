import React from 'react'

//MUI
import { 
    Box,
    Typography,
    Button
} from '@mui/material'

//CSS
import styles from './TaskListMenu.module.scss'

const TaskListMenu = () => {
  return (
    <Box className={styles.taskList}>
        <Typography variant='subtitle1' className={styles.taskList_title}>
        タスク一覧
        </Typography>
        <Box className={styles.taskList_buttons}>
        <Button
        variant='text'
        className={styles.taskList_filter}
        >
            フィルター
        </Button>
        </Box>
    </Box>
  )
}

export default TaskListMenu