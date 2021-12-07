import './App.css';
import FormTambahData from './components/FormTambahData';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from './components/HeaderComponent';
import {Container} from 'reactstrap'


function App() {
  return (
    <div className="app">
      <Container>
      <HeaderComponent/>
      <FormTambahData/>
      </Container>
    </div>
  );
}

export default App;
