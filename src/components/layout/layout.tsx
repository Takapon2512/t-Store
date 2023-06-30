import React from 'react'
import Head from 'next/head'

//MUI
import { Box } from '@mui/material'

//CSS
import styles from './layout.module.scss'

//components
import Header from '../header/Header'
import Footer from '../footer/Footer'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
    <Head>
        <title>T-Store</title>
        <meta name="description" content="シンプルなTodoアプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Header />
    <Box component={'main'} className={styles.main_container}>
      {children}
    </Box>
    <Footer />
    </>
  )
}

export default Layout