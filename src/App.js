import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './components/login';
import Signup from './components/signup';
import Welcome from './components/welcome';
import Otp from './components/otp';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
             <Routes>
              <Route path='/' Component={Login}/>
              <Route path='/signup' Component={Signup}/>
              <Route path='/otp' Component={Otp}/>
              <Route path='/home' Component={Welcome}/>
             </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
