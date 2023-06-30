import React from 'react'

//MUI
import {
    Box,
    Typography
} from '@mui/material'

//CSS
import styles from './header.module.scss'

const Header = () => {
  return (
    <>
    <Box component={'header'} className={styles.app_header}>
        <Typography variant='h1' className={styles.app_title}>
        T-Store
        </Typography>
    </Box>
    </>
  )
}

export default Header