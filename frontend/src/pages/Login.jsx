    import React, { useEffect, useState } from 'react'
    import { RiAdminFill } from "react-icons/ri";
    import { toast, ToastContainer } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import { useNavigate,Link } from 'react-router-dom';

    const Login = () => {

        const navigate = useNavigate()
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const [loading, setLoading] = useState(false);


        const handleLogin = async (e)=>{
            e.preventDefault();

            const response = await fetch('http://127.0.0.1:8000/api/login/',{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({username, password})
            });

            const data = await response.json();

            if(response.ok){
                localStorage.setItem('adminuser',username)
                toast.success(data.message);
                setTimeout(()=>{
                    navigate('/admin-dashboard')
                },2000)
            }else{
                toast.error(data.message)
            }
        }
        const adminUser = localStorage.getItem('adminuser')
        useEffect(()=>{
            if (!adminUser){
                navigate('/admin-login')
            }
        },[])

        return (
            <div className="min-h-screen bg-[#ced4da] flex flex-col justify-center py-12 sm:px-6 lg:px-8">

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-[#6c757d] py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" method="POST" onSubmit={handleLogin}>
                            <h2 className="mt-3 text-center text-3xl font-extrabold text-[#dee2e6]">
                                Admin Login
                            </h2>
                            <div>
                                <label className="block text-sm font-medium text-[#dee2e6]">
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input name="username" type="text" required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300  text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500  focus:z-10 sm:text-sm placeholder:text-neutral-300"
                                        placeholder="Enter your Username" onChange={(e)=>setUsername(e.target.value)} value={username} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#dee2e6]">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input id="password" name="password" type="password" required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder:text-neutral-300 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                                </div>
                            </div>

                            <div>
                                <button type="submit"
                                    className="group relative w-full font-medium flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-[#adb5bd] transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                                    Sign in
                                </button>
                            </div>
                        </form>
                        <div className='flex items-center justify-center mt-5'>
                            <Link to='/' className='no-underline !text-[#dee2e6] px-4 py-2 rounded w-full text-center bg-neutral-700  hover:bg-neutral-800 transition duration-200'>Home</Link>
                        </div>
                    </div>
                    <ToastContainer autoClose={2000}/>
                </div>
            </div>
        )
    }

    export default Login
