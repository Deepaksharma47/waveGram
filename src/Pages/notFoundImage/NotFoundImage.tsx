// import React from 'react';/

import { useSelector } from 'react-redux';
import {   Navigate } from 'react-router-dom';

const PageNotFound = () => {
  const {user} = useSelector((state:any) => state.Auth)

  // const goHome = () => {
  //   navigate('/'); // Navigate to the home page or any other route
  // };

  if(user){
    return <Navigate to="/dashboard" />
  }
  else{
    return <Navigate to="/login" />
  }

  // return (

  //   <Result
  //     status="404"
  //     title="404"
  //     subTitle="Sorry, the page you visited does not exist."
  //     extra={
  //       <Button type="primary" onClick={goHome}>
  //         Back Home
  //       </Button>
  //     }
  //   />
  // );
};

export default PageNotFound;
