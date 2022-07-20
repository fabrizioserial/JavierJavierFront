import React, {useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/home/home'
import { PostPage } from '../pages/postPage/postPage'
import { UserProfile } from '../pages/userProfile/userProfile'
import {useKeycloak} from "@react-keycloak/web";

export const MainRouter = () => {
    const {initialized, keycloak} = useKeycloak();

    useEffect(()=>{
        console.log("main router ",initialized, keycloak)
    },[initialized])

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/users/:userId" element={<UserProfile/>}/>
      <Route path="/posts/:postId" element={<PostPage/>}/>
    </Routes>
  )
}