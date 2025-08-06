import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PublicLayout from '../components/PublicLayout'
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

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormdata] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    mobile: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormdata(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user-signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
        setTimeout(() => {
          navigate('/login')
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
      <div className='flex items-center justify-center h-[80vh] mt-9'>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Sign Up your new account</CardTitle>
            <CardDescription>
              Enter your email below to Sign Up your new account
            </CardDescription>
            <CardAction>
              <Button className='cursor-pointer' variant="link" onClick={() => navigate('/login')}>Login</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name='first_name'
                    placeholder="Enter your first name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Last Name</Label>
                  <Input
                    name="last_name"
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name='password'
                    placeholder='Enter your password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Mobile No.</Label>
                  <Input
                    name='mobile'
                    type="tel"
                    placeholder="Enter your phone no."
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full cursor-pointer">
                  Sign Up
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <ToastContainer/>
      </div>
    </PublicLayout>
  )
}

export default Register
