import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Result = () => {
    const { image, resultImage } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className="mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]">
            <div className="bg-white rounded-lg px-8 py-6 shadow-md">
                {/* image container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* left side */}
                    <div className="flex flex-col">
                        <p className="font-semibold text-gray-600 mb-2">Original</p>
                        {image instanceof File && (
                            <img
                                src={image ? URL.createObjectURL(image) : " "}
                                alt="Original"
                                className="rounded-md w-full object-cover"
                            />
                        )}
                    </div>
                    {/* Right side */}
                    <div className="flex flex-col">
                        <p className="font-semibold text-gray-600 mb-2">
                            Background Removed
                        </p>
                        <div className="rounded-md border border-gray-300 h-full bg-gray-100 relative overflow-hidden">
                            {resultImage && (
                                <img
                                    src={resultImage ? resultImage : " "}
                                    alt="Background removed"
                                    className="w-full object-cover"
                                />
                            )}
                            {!resultImage && image && (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="border-4 border-indigo-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Buttons section */}
                {resultImage && (
                    <div className="flex justify-center md:justify-end items-center flex-wrap gap-4 mt-6">
                        <button
                            className="border text-indigo-600 font-semibold py-2 px-4 rounded-full text-lg hover:scale-105 transition-all duration-300"
                            onClick={() => navigate("/")}
                        >
                            Process another image
                        </button>
                        <a
                            href={resultImage}
                            download
                            className="cursor-pointer py-3 px-6 text-center text-white font-semibold rounded-full bg-gradient-to-r from-purple-300 to-indigo-300 shadow-lg hover:from-purple-600 hover:to-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Download image
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Result;