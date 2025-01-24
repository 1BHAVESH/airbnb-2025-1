import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const Application = () => {
  const navigate = useNavigate(); // useNavigate hook ko initialize karein

  return (
    <div className="text-center mt-8">
      <h1 className="text-2xl">
        If you want to list your property then click here...
      </h1>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            If you are sure then click yes otherwise click on no
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button onClick={() => navigate('/')} className="bg-black hover:text-white hover:bg-[#0F172A]">NO</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button className="bg-black w-[53px] hover:text-white hover:bg-[#0F172A]" onClick={() => navigate("/host-details")}>Yes</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Application
