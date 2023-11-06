 import React, { useEffect, useState } from "react";
 import {Route, Routes} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact";
import Detail from "./components/Detail";
import AddStaff from "./components/AddStaff";
import Login from "./components/Login";
import {gapi} from 'gapi-script';

const clientId = "470759243520-3raplrojn4qdgdv8tdvhk95kudrkmgrg.apps.googleusercontent.com";
 export default function App() {
  const [flag, setFlag] = useState(false);
  useEffect(()=> {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }
    gapi.load("client:auth2", start)
  })
   return (
    <div>
      <NavigationBar/>
      <Routes>
       {!flag ? <Route  element={<Login flag={flag} setFlag={setFlag}/>} path="/"/>
       :
        <Route path="/" element={<Home/>}/>}
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/addNewStaff" element={<AddStaff/>}/>
      </Routes>
    </div>
   )
 }
 