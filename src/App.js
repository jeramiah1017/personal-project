import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header'
import Footer from './components/Footer'
import routes from './routes'
// import stripe from './stripe/react-express-stripe/src/App.js'
function App() {
  return (
    <div className="App">
     <Header />
     {routes}
     <Footer />
    </div>
  );
}

export default App;
