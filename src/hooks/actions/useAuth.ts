// hooks/useAuth.ts
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '../use-auth-store'
import { LoginSchema, RegisterSchema } from '@/lib/validations/auth'

interface AuthProps {
  middleware?: 'guest' | 'auth'
  redirectIfAuthenticated?: string
}



export const useAuth = ({ middleware, redirectIfAuthenticated }: AuthProps = {}) => {
  const router = useRouter()
  const disable = ["/",  ] 
   const pathName = usePathname()
  const { user, token, setAuth, clearAuth, isSeller, isBuyer } = useAuthStore()

  const { data, error, mutate } = useSWR(
    token ? '/api/user' : null,
    () => axios.get('/api/user').then(res => res.data.user),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

const csrf = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie')
    // Tunggu sebentar untuk memastikan cookie ter-set
    await new Promise(resolve => setTimeout(resolve, 100))
  } catch (error) {
    console.error('CSRF cookie error:', error)
    throw error
  }
}


  const register = async (props: RegisterSchema) => {
    try {
      await csrf()
      
      const response = await axios.post('/api/register', props)
      const { user, token } = response.data
      
      setAuth(user, token)
      await mutate()
      
      // Redirect based on role
      if (user.role === 'seller') {
        router.push('/my-shop')
      } else {
        router.push('/dashboard')
      }
      
      return { success: true, message: 'Registration successful!' }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        errors: error.response?.data?.errors || {}
      }
    }
  }

  const login = async ({ email, password }: LoginSchema) => {
    try {
     
      await csrf()
      
      const response = await axios.post('/api/login', { email, password })
      const { user, token } = response.data
      
      setAuth(user, token)
      await mutate()


      
if (!disable.includes(pathName)) {
        if (!user.email_verified_at) {
        router.push('/verify-email')
        return { success: true, message: 'Please verify your email' }
      }
  if (user.role === 'seller') {
    router.push('/my-shop')
  } else {
    router.push('/dashboard')
  }
}
return { success: true, message: 'Login successful!' }

    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        errors: error.response?.data?.errors || {}
      }
    }
  }

  const logout = async () => {
    try {
       
      await axios.post('/api/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
     clearAuth()
     if (!disable.includes(pathName)) {
      router.push('/login')
     } 
    }
  }

  const resendEmailVerification = async () => {
    try {
      await axios.post('/api/email/verification-notification')
      return { success: true, message: 'Verification email sent!' }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send email'
      }
    }
  }

  useEffect(() => {
    if (middleware === 'guest' && user && redirectIfAuthenticated && !disable.includes(pathName)) {
      // Redirect authenticated users away from guest pages
      if (user.role === 'seller') {
        router.push('/my-shop')
      } else {
        router.push('/dashboard')
      }
    }

    if (middleware === 'auth' && !user && !disable.includes(pathName)) {
      // Redirect unauthenticated users to login
      router.push('/login')
    }

    // if (middleware === 'auth' && user && !user.email_verified_at && !disable.includes(pathName)) {
    //   // Redirect unverified users
    //   router.push('/verify-email')
    // }
  }, [user, middleware, redirectIfAuthenticated , pathName])

  return {
    csrf,
    user: data || user,
    register,
    login,
    logout,
    resendEmailVerification,
    isSeller: isSeller(),
    isBuyer: isBuyer(),
    mutate,
  }
}