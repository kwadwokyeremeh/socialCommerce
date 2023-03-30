import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'

import type { AppProps } from 'next/app'

import { ToastContainer } from 'react-toastify'
// Imports css for toasts
import 'react-toastify/dist/ReactToastify.css'

// @ts-ignore, too annoying to define pageProps, hence gives type error
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
            {/* Must add toast container at root so it shows everywhere and toast objects exist throughtout entire app*/}
            <ToastContainer position="bottom-center" autoClose={2500} />
        </SessionProvider>
    )
}

export default MyApp
