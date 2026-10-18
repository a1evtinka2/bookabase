import './App.css';
import BookShellPage from './pages/BookShellPage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
    <BrowserRouter>
      {/* <nav>
        <Link to="/about"><span className="font-mono font-medium text-muted-foreground">about</span></Link> {" "}
        <Link to="/contact"><span className="font-mono font-medium text-muted-foreground">contact</span></Link> {" "}
        <Link to="/logout"><span className="font-mono font-medium text-muted-foreground">logout</span></Link>

      </nav> */}

      <Routes>
        <Route path="/" element={<BookShellPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
