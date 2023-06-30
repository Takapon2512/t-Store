import React from 'react'

//MUI
import { Box } from '@mui/material'

//CSS
import styles from './tasks.module.scss'

const tasks = ({children}: {children: React.ReactNode}) => {
  return (
    <Box className={styles.tasks}>
        {children}
    </Box>
  )
}

export default tasks