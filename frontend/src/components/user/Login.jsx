import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../ui/card";

  

import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Button } from '../ui/button';
import { useLoginUserMutation, useRegisterUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { act } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate()

  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [login, setLogin] = useState({
    email: "",
    password: ""
  })
 
  const [registerUser, {data, isLoading, isError, error, isSuccess}] = useRegisterUserMutation()
  const [loginUser, {data:loginData, isSuccess: loginsuccess, isLoading: loginLoading, isError: loginIsError, error: loginError}] = useLoginUserMutation()

  useEffect(()=> {
    if(isSuccess){
      console.log(data)
      toast.success(data.message || "Successfully Registred")
    }
    if(isError){
      toast.error(error.data.message)
    }
    if(loginsuccess){
      navigate("/")
      toast.success(loginData.message)
      
    }
    if(loginError){
      toast.error(loginError.data.message)
    }
  },[isSuccess, isError, loginsuccess, loginError])

  const changeInputHandler = (e, type) => {

    const {name, value} = e.target

    if(type === "signup"){
      setSignupInput({...signupInput, [name]: value})
    }
    else if(type === "login"){
      console.log(value)
      setLogin({...login, [name]: value})
    }
  }

  const handleRegisteration = async(type) => {
    // console.log(signupInput)
    // await registerUser(signupInput)

    const inputData = type === "signup" ? signupInput : login

    const action = type === "signup" ? registerUser : loginUser

    await action(inputData)
  }

  return (
    <div className="flex items-center justify-center w-full mt-24">
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Signup</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Create a your Account. Click Signup when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                defaultValue="Dua Lipa"
                name="name"
                value={signupInput.name}
                onChange={(e) => changeInputHandler(e, "signup")}
               required="true"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="abc@gmail.com"
                name="email"
                value={signupInput.email}
                onChange={(e) => changeInputHandler(e, "signup")}
                required="true"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={signupInput.password}
                onChange={(e) => changeInputHandler(e, "signup")}
                required="true"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={isLoading} onClick={()=>handleRegisteration("signup")}>
              {
                isLoading ? (
                  <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait...
                  </>
                ) : "Signup"
              }    
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Please fill the detail to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Email</Label>
              <Input
                id="current"
                type="email"
                name="email"
                value={login.email}
                onChange={(e)=>changeInputHandler(e, "login")}
                required="true"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">password</Label>
              <Input
                id="new"
                type="password"
                name="password"
                value={login.password}
                onChange={(e)=>changeInputHandler(e, "login")}
                
                required="true"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={loginLoading} onClick={() => handleRegisteration("login")}>
             
             {
              loginLoading ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait...
                </>
              ) : "login"
             }
              
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
  )
}

export default Login