import React  from 'react';
import {useSelector} from 'react-redux';
import Navbar from "./components/Navbar";
import EmailBody from './components/EmailBody';
import EmailItems from './components/EmailItems';
import EmailPage from './components/EmailPage';
import "./App.css";

function App() {
  const { emailId } = useSelector(state=>state.filters);
  return (
    <div className="App">
      <Navbar />
      <div className='email'>
        <EmailItems />
        {(emailId) && <EmailBody id = {emailId}/>}
      </div>
      <EmailPage />
    </div>
  );
}

export default App;
