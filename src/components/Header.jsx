import React from "react";
import { Outlet, Link } from "react-router-dom";
import isspic from '../assets/Isabelle.webp'
import tomPic from '../assets/tom.gif'

export default function Header() {


  return (
    <div className="headDiv">
      <div className="newDiv">
      <h1 className="header">Cr
      <img src={tomPic} width={60} />
      ssing Quizzes</h1>
      </div>
      <div className="linkDiv">
        <Link to="/">Home</Link> {" "}  
        <Link to="/about">About</Link> {" "}      
     </div>
      <Outlet />
    </div>
  );
}