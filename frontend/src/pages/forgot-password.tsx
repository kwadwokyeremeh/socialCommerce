import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useState } from 'react'
import { NextPage } from 'next'
import useAuthNext from '@/hooks/auth/useAuthNext'
import authErr from '@/types/auth/authErr'
import ForgotPasswordForm from '@/components/Auth/ForgotPasswordForm'

const ForgotPassword: NextPage = () => {
    const { forgotPassword } = useAuthNext();

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState<authErr | string[]>([])
    const [localStatus, setLocalStatus] = useState(null)

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                }>

                <div className="mb-4 text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your
                    email address and we will email you a password reset link
                    that will allow you to choose a new one.
                </div>

                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={localStatus} />

                <ForgotPasswordForm />
            </AuthCard>
        </GuestLayout>
    )
}

export default ForgotPassword
