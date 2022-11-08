import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
}

export default App;
