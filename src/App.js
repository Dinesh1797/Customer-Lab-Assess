import React, { useState } from 'react';
import SegmentPopup from './AssessmentPopup';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSaveSegmentClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="App">
      <button onClick={handleSaveSegmentClick}>Save segment</button>
      {showPopup && <SegmentPopup onClose={handleClosePopup} />}
    </div>
  );
}

export default App;

