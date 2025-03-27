import './App.css';
import Resume from './components/Resume';
import { person } from './person.js';

function App() {
  return <Resume person={person}></Resume>;
}

export default App;
