

import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface AuthProps {
    middleware?: string;
    redirectIfAuthenticated?: string;

}

interface RegisterProps {
    setErrors: React.Dispatch<React.SetStateAction<string[]>>;
    [key: string]: any;
}

interface LoginProps {
    setErrors: (errors: string []) => void;
    setStatus: (status: string | null) => void;
    [key: string]: any;
}

interface ForgotPasswordProps {
    setErrors: (errors:  string[]) => void;
    setStatus: (status: string | null) => void;
    email: string;
    [key: string]: any;
}

interface ResetPasswordProps {
    setErrors: (errors: string[]) => void;
    setStatus: (status: string | null) => void;
    [key: string]: any;
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: AuthProps ) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const csrf = (): Promise<any> => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }: RegisterProps): Promise<void> => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }: LoginProps): Promise<void> => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }: ForgotPasswordProps): Promise<void> => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }: ResetPasswordProps): Promise<void> => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }: {setStatus:(status:string)=>void}): void=> {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async (): Promise<void> => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

         router.push('/')
      }

      useEffect(() => {
          if (middleware === 'guest' && redirectIfAuthenticated && user)
              router.push(redirectIfAuthenticated)

          if (middleware === 'auth' && (user && !user.email_verified_at))
              router.push('/verify-email')
          
          if (
              window.location.pathname === '/verify-email' &&
              user?.email_verified_at
          )
              router.push(redirectIfAuthenticated!)
          if (middleware === 'auth' && error) logout()
      }, [user, error])

      return {
          user,
          register,
          login,
          forgotPassword,
          resetPassword,
          resendEmailVerification,
          logout,
      }
}