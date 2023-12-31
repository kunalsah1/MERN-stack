import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddEmployees from './Pages/AddEmployees';
import ShowEmployees from './Pages/ShowEmployees';
import UpdateEmployees from './Pages/UpdateEmployees';
import DeleteEmployees from './Pages/DeleteEmployees';
import Home from './Pages/Home';



const App = () => {
  return (
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/employee/add' element={<AddEmployees/>} />
    <Route path='/employee/info/:id' element={<ShowEmployees/>} />
    <Route path='/employee/edit/:id' element={<UpdateEmployees/>} />
    <Route path='/employee/remove/:id' element={<DeleteEmployees/>} />
   </Routes>
  );
}

export default App;
