import {Routes, Route} from 'react-router-dom';
import Index from './pages/index';
// import Write from './pages/write';
import Login from './pages/login';
import Join from './pages/join';
import Header from './components/header';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Index />} />
        {/* <Route exact path="/write" element={<Write />} /> */}
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
