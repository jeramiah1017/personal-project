import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header'
import Footer from './components/Footer'
import routes from './routes'
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
