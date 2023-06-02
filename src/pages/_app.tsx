import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

//MUIデフォルトCSSの上書き防止
import { StyledEngineProvider } from '@mui/material'

//リセットCSS
import 'ress'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <StyledEngineProvider injectFirst>
        <Component {...pageProps} />
      </StyledEngineProvider>
    </RecoilRoot>
  )
}
