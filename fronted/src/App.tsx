import {LoginForm, RegisterForm, TableForm, AddForm, EditForm} from './pages';
// import EditForm from './pages/EditForm';
// import AddForm from './pages/AddForm';
// import { Card } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'


function App() {
  return (
    <>
   
      <Router>
      <Routes>
        <Route path='/' element={<LoginForm/>} />
        <Route path='/register' element={<RegisterForm/>} />
        <Route path='/table' element={<TableForm/>} />
        <Route path="/edit-item/:id" element={<EditForm />} />
        <Route path="/add-item" element={<AddForm />} />
        {/* <Route path="/profile" element={<Profile />} /> */}

      </Routes>
      </Router>
     
    </>
  )
}

export default App
