import React from 'react';
import Staff from './Staff.jsx';
import Sidebar from './Sidebar.jsx';

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <Staff />
    </div>
  );
};

export default App;