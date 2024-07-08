import { Outlet } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const savedForms = localStorage.getItem('forms');
    if (!savedForms) {
      localStorage.setItem('forms', JSON.stringify([]));
    }
  }, []);
  return(
    <div className="main">
      <Outlet/>
    </div>
  )
}

export default App
