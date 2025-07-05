import axios from 'axios';
import React, { createContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth, useClerk, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const [credits, setCredits] = useState(false);
  const [image, setImage] = useState(null);
  const [resultImage, setResultImage] = useState(false);

  const loadUserCredits = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${backendUrl}users/credits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setCredits(response.data.data.credits);
        toast.success('User credits fetched successfully');
      } else {
        toast.error('Failed to fetch user credits');
        console.log('Fetch error:', response.data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch user credits');
      console.error(error);
    }
  };

  const removebg = async (selectedImage) => {
    try {
      if (!isSignedIn) {
        toast.error('Please sign in to remove background');
        return openSignIn();
      }
      if (!selectedImage || !(selectedImage instanceof File)) {
        toast.error("Please select a valid image file.");
        return;
      }

      setImage(selectedImage);
      setResultImage(false);
      navigate("/result");

      const token = await getToken();
      const formData = new FormData();
     selectedImage && formData.append('file', selectedImage);

      const { data: base64Image } = await axios.post(
       ` ${backendUrl}images/remove-background `,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setResultImage(`data:image/png;base64,${base64Image}`);
      setCredits(credits-1);
    } catch (error) {
      console.error('Error removing background:', error);
      toast.error('Failed to remove background. Please try again.');
    }
  };

  const contextValue = {
    backendUrl,
    credits,
    setCredits,
    loadUserCredits,
    image,
    setImage,
    resultImage,
    setResultImage,
    removebg
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;