import React from 'react';
import './index.css';
import Menubar from './components/Menubar';
import Home from './pages/Home';
import Footer from './components/Footer';
import {Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { User } from 'lucide-react';
import UserSyncHandler from './components/UserSyncHandler';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import Result from './pages/Result';
import { Navigate } from 'react-router-dom';
const App=()=>{
  return (
    <div>
      <UserSyncHandler />
      <Menubar />
      <Toaster/>
      <Routes>
      <Route path="/" element={<Home />} />
      {/* this is the protected page only signed user can view that */}
      <Route path="/result" element={
        <>
        <SignedIn>
          <Result/>

        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        </>
      }
/>
<Route path="*" element={<Navigate to="/" />} />
      </Routes>
   
    </div>
  );
}
export default App;