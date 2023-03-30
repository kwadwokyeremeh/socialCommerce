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
import useAuthNext from '@/hooks/auth/useAuthNext'
import PasswordResetForm from '@/components/Auth/PasswordResetForm'

const PasswordReset: NextPage = () => {
    const router = useRouter()

    const { resetPassword } = useAuthNext();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = (event: any) => {
        event.preventDefault()

        // Query Token might not exist, so set earlier with defaults
        const token = router.query.token ?? [];

        // Reset password
        resetPassword(email, password, passwordConfirmation, token)
            .then(res => router.push('/login?reset=' + btoa(res.status)))
            .catch(err => {
                if (err.response.status !== 422) throw err;
                setErrors(err.response.data.errors);
            });
    }

    useEffect(() => {
        setEmail(router.query.email || '')
    }, [router.query.email])

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                }>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                <PasswordResetForm />
            </AuthCard>
        </GuestLayout>
    )
}

export default PasswordReset
