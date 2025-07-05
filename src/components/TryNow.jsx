import React ,{useContext}from 'react';
import { AppContext } from '../context/AppContext.jsx';
const TryNow = () => {
    const {removebg} = useContext(AppContext);
    return (
        <div className="flex flex-col items-center justify-center bg-white px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                Remove Background Image
            </h2>
            <p className="text-gray-400 mb-8 text-center">
                Get a transparent background in seconds with our AI-powered tool.
            </p>
            <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center space-y-4">
                <input type="file" id='upload2' hidden accept="images/*"  onChange={(e)=>
                   removebg(e.target.files[0])
                }/>
                <label htmlFor="upload2" className='bg-indigo-600 text-white hover:bg-blue-700 
            font-semibold py-3 px-6 rounded-full text-lg'>
                    Upload Image
                </label>
                <p className="text-gray-500 text-sm">
                    or drop a file, paste image or <a href='#' className='text-blue-500 hover:underline'>URL</a>
                </p>
            </div>

        </div>
    );
}
export default TryNow;