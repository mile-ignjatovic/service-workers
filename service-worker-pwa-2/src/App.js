import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Users from './Users';
import Home from './Home';
import About from './About';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  USERS: '/users'
}

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand>LOGO</Navbar.Brand>
            <Nav className="me-auto">
              <Nav><Link to={ROUTES.HOME}>Home</Link></Nav>
              <Nav><Link to={ROUTES.ABOUT}>About</Link></Nav>
              <Nav><Link to={ROUTES.USERS}>Users</Link></Nav>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path={ROUTES.ABOUT} element={<About />}></Route>
          <Route path={ROUTES.USERS} element={<Users/>}></Route>
          <Route path={ROUTES.HOME} element={<Home/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
