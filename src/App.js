import Search from './Search';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Show from "./Show";
import Event from "./Event";
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/Show" element={<Show />} />
      <Route path="/Show/:reg" element={<Show />} />

      <Route path="/" element={ <LoginPage/>} /> 
      <Route path="/Register" element={ <RegistrationPage/>} /> 
      <Route path="/Event/:event" element={<Event />} /> 
      <Route path="/Event" element={<Event />} /> 

      <Route path="/Search" element={<Search />} /> 
    </ Routes>
  </BrowserRouter>
    </>
  );
}
export default App;