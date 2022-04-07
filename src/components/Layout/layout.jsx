import React from "react"
import Header from "../Header/header";
import Container from "../container";

const Layout = ({ children, headTitle }) =>{
  return(
    <Container>
        <Header title={headTitle}/>
        { children }
    </Container>
  )
}
export default Layout