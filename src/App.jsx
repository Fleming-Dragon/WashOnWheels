import React, { useState } from 'react';
import Timeline from './pages/Timeline';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import Footer from './pages/Footer';

import logo1 from './assets/logo2.jpg'; // Adjust the path as necessary

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <Page1 navigateToPage={setCurrentPage} />;
      case 2:
        return <Page2 navigateToPage={setCurrentPage} />;
      case 3:
        return <Page3 navigateToPage={setCurrentPage} />;
      case 4:
        return <Page4 navigateToPage={setCurrentPage} />;
      case 5:
        return <Page5 navigateToPage={setCurrentPage} />;
      default:
        return <Page1 navigateToPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <div className="container mx-auto" style={{ backgroundColor: '#fff' }}>
        <img src={logo1} alt="logo" className='w-32 h-32 mx-auto' />
        <Timeline currentPage={currentPage} />
        <div className="mt-4">
          {renderPage()}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;