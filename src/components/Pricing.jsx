import React from 'react';
import { plans } from '../assets/assets';
import { useAuth, useClerk } from '@clerk/clerk-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import{ place_Order} from '../service/OrderService';



const Pricing=()=>{

const {isSignedIn, getToken} = useAuth();
const {openSignIn }= useClerk();
  const {loadUserCredits,backendUrl} = useContext(AppContext);
  const handleOrder=(planId)=>{
    if(!isSignedIn) { // agar user signed in nahi hai toh phir
      // Show sign-in page
      return openSignIn();
    }
    place_Order({
      planId,getToken,onSuccess:()=>{
            loadUserCredits
    },
    backendUrl});
  }

    return (
        <div className= "py-10 md:px-20 lg:px-20 ">
            <div className="container mx-auto px-4 ">
                {/* Section title */}
                <div className="mb-12 text-centre">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12  text-center">
                        Choose Your Perfect Plan
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-black-400">
                        Select the plan that best suits your needs. Enjoy unlimited background removals with our affordable pricing options.
                    </p>
                    
                </div>
                {/* Section body */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative pt-6 p-6 ${
                plan.popular
                  ? 'backdrop-blur-lg rounded-2xl'
                  : 'border border-gray-800 rounded-xl'
              } bg-[#000003] hover:-translate-y-2 transform transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-3 py-1 text-white text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="text-center p-6">
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <div className="mt-4 text-center">
                  <span className="text-4xl text-violet-400 font-bold">
                    &#8377; {plan.price}
                  </span>
                </div>
              </div>

              <div className="px-4 pb-8">
                <ul className="mb-8 space-y-4">
                  <li className="flex items-center text-white">{plan.credits}</li>
                  <li className="flex items-center text-white">{plan.description}</li>
                </ul>
                <button
                  className="w-full py-3 px-6 text-center text-white font-semibold rounded-full
                  bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg 
                  hover:from-purple-600 hover:to-indigo-600 
                  transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                  onClick={()=>handleOrder(plan.id)}
                >
                  Choose Plan 
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
 