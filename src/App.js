import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Component/Header';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Cards from './Component/Cards';


function App() {
  return (
    <div>
     <div className='h'><Header /></div> 
     <br/>
      <div className='main'>
        <div className='c'><Cards /></div>


      </div>

    </div>
  );
}

export default App;
