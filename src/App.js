import {useSelector} from 'react-redux';
import Navbar from "./components/Navbar";
import EmailBody from './components/EmailBody';
import EmailItems from './components/EmailItems';
import EmailPage from './components/EmailPage';
import "./App.css";

function App() {
  const { id } = useSelector(state=>state.filters);
  return (
    <div className="App">
      <Navbar />
      can you see?
      <div className='email'>
        <EmailItems />
        {(id) && <EmailBody id = {id}/>}
      </div>
      <EmailPage />
    </div>
  );
}

export default App;
