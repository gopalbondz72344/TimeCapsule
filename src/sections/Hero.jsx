import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import RingLoader from 'react-spinners/RingLoader';

const Hero = () => {
    const [isLoading, setIsLoading] = useState(true); // State to track loading

    const handleLoad = () => {
        console.log('🎉 Spline 3D scene loaded');
        // Delay hiding the loader for 5 seconds (5000 milliseconds)
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div id="hero" className="relative md:mt-[86px] sm:mt[84px] md:w-full 00 h-screen">
            {/* Loader */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#01112E]">
                    <RingLoader color="#ffffff" loading={isLoading} size={80} />
                </div>
            )}

            {/* Spline 3D scene */}
            <Spline
                scene="https://prod.spline.design/lPl-rbTTSzoelNos/scene.splinecode"
                onLoad={handleLoad}
            />

            {/* Content to display after loading is complete */}
            {!isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    {/* Quote section */}
                    <p className="text-white text-md md:text-xl font-semibold mb-8">
                        &#34;A time capsule is not just a box; it&#39;s a treasure chest filled with stories waiting to be told.&#34; – Unknown
                    </p>

                    {/* Text section */}
                    <p className="text-white text-md md:text-lg mb-8 px-4">
                        Time capsules are more than just containers; they are the bridges between past, present, and future.
                        They allow us to preserve memories, milestones, and stories, creating a tangible connection to the past.
                        Whether it’s a letter to future generations, a keepsake of an important moment, or a collection of items
                        that define an era, a time capsule serves as a timeless reminder of who we were and how we lived.
                    </p>

                    {/* Buttons */}
                    <div className="flex space-x-4 mt-[100px]">
                        <button className="px-4 py-2 text-white font-bold border border-white bg-black rounded-md hover:bg-white hover:text-black transition duration-300">
                            <a href="/login">Login</a>
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                            <a href="/register">Register</a>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;
