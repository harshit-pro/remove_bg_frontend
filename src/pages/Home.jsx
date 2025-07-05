import BgRemovalSteps from '../components/BgRemovalSteps';
import React from 'react';
import Header from '../components/Header';
import BgSlider from '../components/BgSlider';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonial';
import TryNow from '../components/TryNow';
import Footer from '../components/Footer';
const Home =()=>{
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-['Outfit']">

            {/* Hero Section  */}
            <Header/>
            {/* Background Removal Steps */}
            <BgRemovalSteps />
            {/* Slider Section */}
            <BgSlider />
            {/* Credit Plans section */}
            <Pricing/>
            {/* Testimonial section */}
            <Testimonials/>
            {/* Try Now Component */}
            <TryNow />
            {/* Footer Section */}
            <Footer/>
        </div>
        
    )
}

export default Home;