import React, { useState } from 'react'
import PublicLayout from '../components/PublicLayout'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast, ToastContainer } from 'react-toastify'

const UserLogin = () => {
    const navigate = useNavigate()


    const [formData, setFormdata] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormdata(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('https://motorental-backend.onrender.com/api/user-login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                toast.success(data.message)
                localStorage.setItem('userID', data.userID)
                localStorage.setItem('fullname', data.fullname)
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Something Went Wrong')
        }
    }
    return (
        <PublicLayout>
            <div className='flex items-center justify-center h-[80vh] mt-9 '>
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                        <CardAction>
                            <Button variant="link" className='cursor-pointer' onClick={() => navigate('/register')}>Sign Up</Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input id="password" name='password' value={formData.password} onChange={handleChange} placeholder='Enter Your Password' type="password" required />
                                </div>
                            </div>
                            <CardFooter className="flex-col gap-2 ">
                                <Button type="submit" className="w-full cursor-pointer mt-6">
                                    Login
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
                <ToastContainer />
            </div>
        </PublicLayout>
    )
}

export default UserLogin
