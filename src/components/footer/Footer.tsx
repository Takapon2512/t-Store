import React from 'react'

//MUI
import {
    Box,
    Typography
} from '@mui/material'

//CSS
import styles from './Footer.module.scss'

const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()

    return (
        <Box component='footer' className={styles.app_footer}>
            <Typography variant='h6' className={styles.app_title}>
                &copy; {year} T-Store
            </Typography>
        </Box>
    )
    }

export default Footer