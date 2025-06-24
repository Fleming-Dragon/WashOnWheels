import React, { useEffect, useState } from 'react';
import logo1 from '../assets/logo.jpg';

const TimelineItem = ({ children, currentPage, pageNumber, isMobile }) => {
    const isCompleted = currentPage >= pageNumber;

    // Using the color scheme:
    // - #f04b41 (primary red) for completed items
    // - #43a6bc (light blue) for accent elements
    // - #53abc7 (medium blue) for secondary elements
    // - #2f616d (dark blue) for text and borders

    return (
        <div className="flex flex-col items-center">
            {/* Timeline separator with dot and connector */}
            <div className="flex items-center">
                {/* Left connector - adjust width for mobile */}
                <div
                    className={`h-1 ${isMobile ? 'w-3 sm:w-6 md:w-12' : 'w-12 sm:w-16 md:w-24'}`}
                    style={{
                        backgroundColor: isCompleted ? '#f04b41' : '#e2e8f0'
                    }}
                ></div>

                {/* Timeline dot - adjust size for mobile */}
                <div
                    className={`rounded-full ${isMobile ? 'h-5 w-5 sm:h-6 sm:w-6' : 'h-6 w-6 sm:h-8 sm:w-8'} z-10 flex items-center justify-center`}
                    style={{
                        backgroundColor: isCompleted ? '#f04b41' : '#e2e8f0',
                        border: isCompleted ? 'none' : '1px solid #d1d5db'
                    }}
                >
                    {isCompleted && (
                        <img
                            src={logo1}
                            alt="Logo"
                            className={`rounded-full ${isMobile ? 'h-5 w-5 sm:h-6 sm:w-6' : 'h-6 w-6 sm:h-8 sm:w-8'}`}
                        />
                    )}
                </div>

                {/* Right connector - adjust width for mobile */}
                <div
                    className={`h-1 ${isMobile ? 'w-3 sm:w-6 md:w-12' : 'w-12 sm:w-16 md:w-24'}`}
                    style={{
                        backgroundColor: pageNumber < currentPage ? '#f04b41' : '#e2e8f0'
                    }}
                ></div>
            </div>

            {/* Text - adjust size and visibility based on screen size */}
            <div
                className={`${isMobile ? 'mb-2 text-xs' : 'mb-4 text-sm sm:text-base'} max-w-xs text-center mt-1 sm:mt-2 font-medium`}
                style={{
                    color: isCompleted ? '#2f616d' : '#9ca3af'
                }}
            >
                {isMobile ? (pageNumber === currentPage ? children : pageNumber) : children}
            </div>
        </div>
    );
};

const Timeline = ({ currentPage = 1 }) => {
    // Define page titles with more descriptive names
    const pageNames = [
        "Choose Date & Time",
        "Book Service",
        "Delivery Address",
        "Payment",
        "Confirmation"
    ];

    // Add responsive detection
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        // Initial check
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="py-2 sm:py-4 px-0 mb-3 sm:mb-6 overflow-x-auto">
            <div className="flex justify-center min-w-max">
                {pageNames.map((name, index) => (
                    <TimelineItem
                        key={index}
                        currentPage={currentPage}
                        pageNumber={index + 1}
                        isMobile={isMobile}
                    >
                        {name}
                    </TimelineItem>
                ))}
            </div>
        </div>
    );
};

export default Timeline;