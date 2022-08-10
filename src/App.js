import './App.css';
import Form from './components/Form/Form';
import Navbar from './components/Navbar/Navbar';
import { Routes,Route } from 'react-router-dom';
import SocialLogin from './components/Login/SocialLogin';
import RequireAuth from './components/Login/RequireAuth/RequireAuth';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='/login' element={<SocialLogin></SocialLogin>}></Route>
        <Route path="/" element={<RequireAuth>
          <Form />
        </RequireAuth>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;