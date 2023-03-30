import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Link from 'next/link'
import { NextPage } from 'next'
import useAuthMiddleware from '@/hooks/auth/useAuthMiddleware'
import RegisterForm from '@/components/Auth/RegisterForm'

const Register: NextPage = () => {
    // Redirect to dashboard if authed
    const {} = useAuthMiddleware('/dashboard')

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                }>

                <RegisterForm />
            </AuthCard>
        </GuestLayout>
    )
}

export default Register
