import loginType from '@/types/auth/loginType'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as Yup from 'yup'
import useAuthNext from '@/hooks/auth/useAuthNext'
import authErr from '@/types/auth/authErr'
import { Form, Formik, Field } from 'formik'
import { toast } from 'react-toastify';

import styles from '@/components/Auth/LoginForm.module.css'
import Button from '@/components/Button'
import Link from 'next/link'
import InputError from '@/components/InputError'
import MyTextInput from '@/components/Forms/MyTextInput'

const LoginForm = ({}) => {
    const [errors, setErrors] = useState<authErr | string[]>([])

    const router = useRouter()

    const { signInApp } = useAuthNext()

    //#region Form Defaults/Validation and Boilerplates
    const initFormValues: loginType = {
        email: '',
        password: '',
        remember: true,
    }

    /**
     * Form Validation Checkers
     */
    const formValidation = Yup.object({
        email: Yup.string().email('Invalid Email Address').required('Required'),
        password: Yup.string()
            .max(255, 'Must be 255 characters or less')
            .required('Required'),
        remember: Yup.boolean().required('Required'),
    })
    //#endregion Form Defaults/Validation and Boilerplates

    const handleSubmit = async (formVals: loginType) => {
        // // Post off login
        let loginPromise = signInApp(
            formVals.email,
            formVals.password,
            formVals.remember,
        )
            .then(res => {
                // NextAuth can't throw an error by default
                if (!(res.ok)) {
                    
                    throw {
                        error: res.error,
                        status: res.status
                    };
                } else {
                    // Logged in, redirect to home
                    router.push('/')
                }
            })
            .catch(err => {
                // Technically doesn't work, but uncaught thrown objects will result in an error
                setErrors({
                    email: [err.error ?? 'System Error: Please Try Again Later'],
                })
                throw err;
            })

        // Create toast that resolves on the promise
        // Shows the error message from api error as well
        toast.promise(loginPromise, {
            success: 'Successfully Logged In!',
            pending: 'Logging In...',
            error: {
                render(err: any) {
                    if (err.data.status >= 500) return 'System Error: Please Try Again Later';

                    return `${
                        err.data.error ??
                        'Something went wrong, please try again later'
                    }`
                },
            },
        })
    }

    // Notice the onChange handlers? Although Formik "should" auto handle input, that only works
    // if the fields are in the same file. Which gets fairly messy. Instead just onChange so things can be
    // nicely separated and relatively usable reusable
    return (
        <Formik
            initialValues={initFormValues}
            validationSchema={formValidation}
            onSubmit={(values, { resetForm }) => {
                // Use finally since submitting is set to false whether it succeeds or not, reduces repeat code
                handleSubmit(values).finally(() => {
                    // Clear form
                    resetForm({})
                })
            }}>
            {/* Added props get get Formilk values and directly set the field values */}
            {({ values, setFieldValue }) => (
                <Form className={styles.form}>
                    <InputError messages={errors.email} className="mt-2" />

                    <div className={`${styles.form_item}`}>
                        <MyTextInput
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="example@example.com"
                            onChange={(event: any) => {
                                setFieldValue(
                                    event.target.name,
                                    event.target.value,
                                )
                            }}
                        />
                    </div>

                    <div className={`${styles.form_item}`}>
                        <MyTextInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder=""
                            onChange={(event: any) => {
                                setFieldValue(
                                    event.target.name,
                                    event.target.value,
                                )
                            }}
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="form-control w-full max-w-md">
                        <label
                            className="label cursor-pointer flex justify-start"
                            htmlFor="remember_me">

                            <Field
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className='checkbox'
                            />

                            <span className="label-text pl-2">Remember me</span>
                        </label>
                    </div>

                    <div className={styles.form_action_container}>
                        <Link href="/forgot-password" className="link pr-4">
                            Forgot your password?
                        </Link>

                        <Button className={styles.form_btn}>Login</Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm
