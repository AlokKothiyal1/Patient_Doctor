
import './App.css';
import Routes from './components/Routes/Routes';
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
   
      <BrowserRouter>
        <div className="App">
          <Routes></Routes>
        </div>
      </BrowserRouter>
    
  );
}

export default App;
