import './App.css';
import Login from './component/Login';
import Registration from './component/Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calculator from './component/Calculator';

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Login/>}/>
          <Route path="/calculator" element={<Calculator/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="*" element={<main style={{ padding: "1rem" }}><p>There's nothing here!</p> </main>} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
