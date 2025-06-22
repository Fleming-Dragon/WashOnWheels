import React from 'react';
import logo1 from '../assets/logo.jpg';

const TimelineItem = ({ children, currentPage, pageNumber }) => {
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
                {/* Left connector */}
                <div
                    className="h-1 w-24"
                    style={{
                        backgroundColor: isCompleted ? '#f04b41' : '#e2e8f0'
                    }}
                ></div>

                {/* Timeline dot */}
                <div
                    className="rounded-full h-8 w-8 z-10 flex items-center justify-center"
                    style={{
                        backgroundColor: isCompleted ? '#f04b41' : '#e2e8f0',
                        border: isCompleted ? 'none' : '1px solid #d1d5db'
                    }}
                >
                    {isCompleted && (
                        <img
                            src={logo1}
                            alt="Logo"
                            className="rounded-full h-8 w-8"
                        />
                    )}
                </div>

                {/* Right connector */}
                <div
                    className="h-1 w-24"
                    style={{
                        backgroundColor: pageNumber < currentPage ? '#f04b41' : '#e2e8f0'
                    }}
                ></div>
            </div>

            <div
                className="mb-4 max-w-xs text-center mt-2 font-medium"
                style={{
                    color: isCompleted ? '#2f616d' : '#9ca3af'
                }}
            >
                {children}
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

    return (
        <div className="py-4 px-0 mb-6">
            <div className="flex justify-center">
                {pageNames.map((name, index) => (
                    <TimelineItem
                        key={index}
                        currentPage={currentPage}
                        pageNumber={index + 1}
                    >
                        {name}
                    </TimelineItem>
                ))}
            </div>
        </div>
    );
};

export default Timeline;