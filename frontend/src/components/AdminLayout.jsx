import React, {useState, useEffect} from 'react'
import Sidebar from './Sidebar'
import Adminheader from './Adminheader'
import '../assets/css/admin.css'

const AdminLayout = ({children}) => {

    const[siderBar, setSidebar] = useState(true)

    useEffect(()=>{
        const handleSize = ()=>{
            if(window.innerWidth < 768){ //mobile view
                setSidebar(false)
            }
            else{
                setSidebar(true)
            }
        }
        handleSize();
        window.addEventListener('resize', handleSize)
        return ()=> removeEventListener('resize',handleSize)
    },[])

    const toggleSidebar = ()=>{
      setSidebar(prev=>!prev)
    }
  return (
    <div className='flex '>
      {siderBar && <Sidebar/>}
      <div id='page-wrapper' className={`w-full ${siderBar ? 'withsidebar' : 'withoutsidebar' }`}>
        <Adminheader toggleSidebar={toggleSidebar} siderBar={siderBar}/>
        <div className='mt-4'> 
        {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
