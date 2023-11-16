import {Routes, Route} from 'react-router-dom';
import Index from './pages/index';
// import Write from './pages/write';
import Login from './pages/login';
import Join from './pages/join';
import Header from './components/header';
import MyPage from './pages/mypage';
import Detail from './pages/detail';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <div style={{float: "left", marginTop: 75, width:"100%"}}></div>
      <Routes>
        <Route exact path="/" element={<Index />} />
        {/* <Route exact path="/write" element={<Write />} /> */}
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/mypage" element={<MyPage />} />
        <Route exact path="/detail" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
