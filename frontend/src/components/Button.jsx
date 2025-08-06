import { TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';

export default function Component({ company, onSuccess }) {

  const [editCompany, setEditcompany] = useState(company || {})
  const handleDelete = async (companyID) => {
    if (window.confirm('Are you sure you want to delete?')) {


      try {
        const response = await fetch(`http://127.0.0.1:8000/api/delete-company/${companyID}/`, {
          method: 'DELETE',
        })
        if (response.ok) {
          toast.success('Company Deleted')

          onSuccess()  //re-render the parent data
        }
        else {
          toast.error('Company Not Deleted')
        }

      }
      catch (error) {
        console.log("Something went wrong",error)
      }
    }
  }
  return (
    <Button variant="destructive" onClick={() => handleDelete(company.id)}>
      <TrashIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
      Delete
      <ToastContainer />
    </Button>
  )
}
