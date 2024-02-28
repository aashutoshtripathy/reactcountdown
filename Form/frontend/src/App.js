import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Create from './components/Create';
import Signup from './components/Signup';
import Update from './components/Update';
import Optval from './components/Optval';
import Form from './components/Form';
import Formdata from './components/Formdata';
import Formupdate from './components/Formupdate';


function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/update/:id' element={<Update/>}/>
        <Route path='/optval' element={<Optval/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/formdata' element={<Formdata/>}/>
        <Route path='/updateform' element={<Formupdate/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
