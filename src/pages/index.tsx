import React, { useState, useEffect } from "react";
import { 
  useForm, 
  SubmitHandler 
} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from "next/link";
import { useRouter } from "next/router";

//Recoil
import { useRecoilState } from "recoil";
import { userNameState } from '@/store/AuthState'

//MUI
import { 
  Button,
  Container,
  Stack,
  TextField,
  Typography
} from '@mui/material'

//Components
import Layout from "@/components/layout/layout";

//CSS
import styles from '../styles/Home.module.scss'

//Firebase
import { 
  signInWithPopup, 
  onAuthStateChanged,
  User
} from "firebase/auth";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import app from "../../libs/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../libs/firebase";
import { 
    collection, 
    getDocs
} from 'firebase/firestore'

//フォームの型
type SignUpType = {
  email: string,
  name: string,
  password: string
}

//バリデーションルール
const schema = yup.object({
  email: yup
    .string()
    .required('必須項目です')
    .email('正しいメールアドレスを入力してください'),
  name: yup.string().required('必須項目です'),
  password: yup
    .string()
    .required('必須項目です')
    .min(7, '7文字以上で入力してください')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/,
      '英数字と記号を利用してください'
    )
})

const Home = () => {
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()
  
  //useState
  const [isUser, setIsUser] = useState<User | null>(null)
  const [formText, setFormText] = useState<SignUpType>({
    email: '',
    name: '',
    password: ''
  })

  //Recoil
  const [userName, setUserName] = useRecoilState(userNameState)

  //UseRouter
  const router = useRouter()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormText((prev) => ({ ...prev, email: e.target.value }))
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormText((prev) => ({ ...prev, name: e.target.value }))
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormText((prev) => ({ ...prev, password: e.target.value }))

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<SignUpType>({
    resolver: yupResolver(schema),
  })

  //フォーム送信時の処理
  const onSubmit: SubmitHandler<SignUpType> = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        formText.email,
        formText.password
      )
    } catch(error) {
      alert('正しく入力してください')
    }

    //ユーザーの名前をローカルストレージに保存
    localStorage.setItem('user', formText.name)

    if (isUser) router.push('./mypage/Mypage')

  }

  //Googleアカウントを利用したサインイン処理
  const signInWithGoogleAccount = async () => {
    await signInWithPopup(auth, provider)
    .catch((err) => alert(`ログインに失敗しました。`))

    if (isUser) router.push('../mypage/Mypage')
  }

  //ログインページに遷移
  const toLoginPage = () => router.push('./signIn/SignIn')

  //ログインしているかを判定
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setIsUser(currentUser)
    })

    if (isUser) router.push('../mypage/Mypage')
  }, [isUser])

  return (
    <>
    <Layout>
      <Container className={styles.form_container}>
        <Typography variant="h6" className={styles.form_title}>
          サインアップ
        </Typography>
        <Stack>
          <TextField 
          className={styles.form_text} 
          required 
          label='メールアドレス' 
          type="email" 
          { ...register('email') }
          error={'email' in errors}
          helperText={errors.email?.message}
          value={formText.email}
          onChange={handleEmailChange}
          />
          <TextField 
          className={styles.form_text} 
          required 
          label='お名前'
          { ...register('name') }
          error={'name' in errors}
          helperText={errors.name?.message}
          value={formText.name}
          onChange={handleNameChange}
          />
          <TextField 
          className={styles.form_text} 
          required 
          label='パスワード' 
          type="password" 
          { ...register('password') }
          error={'password' in errors}
          helperText={errors.password?.message}
          value={formText.password}
          onChange={handlePasswordChange}
          />
          <Button 
          color="primary" 
          size="large" 
          variant="contained"
          sx={{mb: 1}}
          onClick={handleSubmit(onSubmit)}
          >
            アカウントを作成
          </Button>
          <Button
          color="secondary"
          size="large"
          variant="contained"
          sx={{mb: 1, textTransform: 'none'}}
          onClick={signInWithGoogleAccount}
          >
            Googleアカウントをお持ちの方はこちら
          </Button>
          <Button 
          variant="outlined"
          onClick={toLoginPage}
          >
            アカウントをお持ちの方はこちら
          </Button>
        </Stack>
      </Container>
    </Layout>
    </>
  )
}

export default Home;