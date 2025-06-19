import React from "react";
import { Outlet, Link } from "react-router-dom";
import isspic from '../assets/Isabelle.webp'

export default function Header() {


  return (
    <div className="headDiv">
      <h1 className="header">ACQuizzes <img src={isspic}  width={75}/></h1>
      <div className="linkDiv">
        <Link to="/">Home</Link> {" "}  
        <Link to="/about">About</Link> {" "}      
     </div>
      <Outlet />
    </div>
  );
}