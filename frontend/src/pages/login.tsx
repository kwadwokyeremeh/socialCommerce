import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import authErr from '@/types/auth/authErr'
import LoginForm from '@/components/Auth/LoginForm'

const Login: NextPage = () => {
    const router = useRouter()

    const [errors, setErrors] = useState<authErr | string[]>([])
    const [localStatus, setLocalStatus] = useState(null)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setLocalStatus(atob(router.query.reset))
        } else {
            setLocalStatus(null)
        }
    })

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                }>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={localStatus} />

                <LoginForm />
            </AuthCard>
        </GuestLayout>
    )
}

export default Login
