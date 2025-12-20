
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CiEdit } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify'





export default function Modal({ company, onSuccess }) {

  const [editCompany, setEditcompany] = useState(company || {})
  const handleEdit = (company) => {
    setEditcompany(company)
  } 
  const handleUpdate = async ()=>{
    try{
      const response = await fetch(`http://127.0.0.1:8000/api/update-company/${editCompany.id}/`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(editCompany),
      })
      if(response.ok){
        toast.success('Company Updated')
  
        onSuccess()  //re-render the parent data
      }
      else{
        toast.error('Company Not Updated')
      }

    }
    catch(error){
      console.log("Something went wrong")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => handleEdit(company)} variant="outline"><CiEdit />Edit</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Edit company
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto">
          <div className="px-6 pt-4 pb-6">
            <form className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label>Company Name</Label>
                <div className="relative">
                  <Input
                    className="peer pe-9"
                    placeholder="Company Name"
                    type="text"
                    required
                    value={editCompany.company_name || ''}
                    onChange={(e) => setEditcompany({ ...editCompany, company_name: e.target.value })}

                  />
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleUpdate} type="button">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
