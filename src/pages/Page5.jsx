import React, { useState } from 'react';
import bgimg5 from "../assets/bgimg/img2.jpg";
import { motion, AnimatePresence } from 'framer-motion'; // Fixed import

// Animation variants for reuse
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
            duration: 0.6,
            ease: "easeInOut"
        }
    },
    exit: {
        opacity: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.05,
            staggerDirection: -1,
            duration: 0.3
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: {
        y: -10,
        opacity: 0,
        transition: { duration: 0.2 }
    }
};

const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.95, boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" },
    disabled: { scale: 1, opacity: 0.7 }
};

const Page5 = ({ navigateToPage }) => {
    const [isConfirming, setIsConfirming] = useState(false);
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

    const handleGoToPage5 = () => {
        // Simulate confirmation processing
        setIsConfirming(true);
        setTimeout(() => {
            setIsConfirming(false);
            setIsBookingConfirmed(true);
        }, 1500);
    };

    const handleGoToPage4 = () => {
        navigateToPage(4);
    };

    const handleGoToPage1 = () => {
        navigateToPage(1);
    };

    // Booking Successful Component
    const BookingSuccessful = () => (
        <motion.div
            className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4 sm:p-6 w-full max-w-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.div
                className="rounded-full p-2 sm:p-3 mb-3 sm:mb-4"
                style={{ backgroundColor: '#e6f7f1' }}
                variants={itemVariants}
                whileHover={{
                    scale: 1.05,
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 }
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#f04b41' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </motion.div>

            <motion.h2
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: '#f04b41' }}
                variants={itemVariants}
            >
                Booking Successful!
            </motion.h2>

            <motion.p
                className="text-center text-sm sm:text-base mb-3 sm:mb-4"
                style={{ color: '#2f616d' }}
                variants={itemVariants}
            >
                Your car wash appointment has been confirmed for June 20, 2025 at 2:30 PM.
            </motion.p>

            <motion.div
                className="flex items-center justify-center bg-blue-50 px-3 py-2 rounded-md mb-3 sm:mb-4 w-full"
                variants={itemVariants}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#43a6bc' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs sm:text-sm" style={{ color: '#2f616d' }}>
                    A confirmation has been sent to your email.
                </p>
            </motion.div>

            <motion.div
                className="bg-gray-50 p-3 sm:p-4 rounded-md mb-4 sm:mb-5 w-full"
                variants={itemVariants}
            >
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs sm:text-sm text-gray-500">Booking Reference:</span>
                    <span className="font-semibold text-sm sm:text-base" style={{ color: '#2f616d' }}>WOW-12345</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-500">Amount Paid:</span>
                    <span className="font-semibold text-sm sm:text-base" style={{ color: '#2f616d' }}>$26.98</span>
                </div>
            </motion.div>

            <motion.div
                className="border-t border-gray-200 pt-3 sm:pt-4 w-full"
                variants={itemVariants}
            >
                <h3 className="font-semibold text-sm sm:text-base mb-2" style={{ color: '#2f616d' }}>What's Next?</h3>
                <ul className="space-y-1 sm:space-y-2 mb-4 sm:mb-6 pl-5" style={{ color: '#2f616d' }}>
                    <li className="text-xs sm:text-sm flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#43a6bc' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Arrive 5 minutes before your scheduled time
                    </li>
                    <li className="text-xs sm:text-sm flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#43a6bc' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Look for our mobile washing station at your location
                    </li>
                    <li className="text-xs sm:text-sm flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#43a6bc' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Have your reference number ready
                    </li>
                </ul>
            </motion.div>

            <motion.div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3" variants={itemVariants}>
                <motion.button
                    onClick={handleGoToPage1}
                    className="px-4 py-2 text-white rounded transition-colors focus:outline-none text-sm sm:text-base"
                    style={{ backgroundColor: '#43a6bc' }}
                    whileHover={buttonVariants.hover}
                    whileTap={buttonVariants.tap}
                >
                    Return to Home
                </motion.button>

                <motion.button
                    className="px-4 py-2 border rounded transition-colors focus:outline-none text-sm sm:text-base"
                    style={{ borderColor: '#43a6bc', color: '#43a6bc' }}
                    whileHover={{
                        backgroundColor: 'rgba(67, 166, 188, 0.05)',
                        scale: 1.05
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        // Here you could implement a share feature or print functionality
                        window.alert('Share booking details feature will be implemented here');
                    }}
                >
                    <div className="flex items-center justify-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        <span>Share Details</span>
                    </div>
                </motion.button>
            </motion.div>
        </motion.div>
    );

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-50 p-3 sm:p-6"
            style={{
                backgroundImage: `url(${bgimg5})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="text-xl sm:text-2xl font-bold mb-3 sm:mb-6 text-center text-white"
                initial={{ opacity: 0, y: -30 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                    }
                }}
                exit={{ opacity: 0, y: -20 }}
            >
                {isBookingConfirmed ? 'Booking Confirmed' : 'Review & Confirm'}
            </motion.div>

            <AnimatePresence mode="wait">
                {isBookingConfirmed ? (
                    <BookingSuccessful />
                ) : (
                    <motion.div
                        className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full max-w-md"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover={{
                            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                            transition: { duration: 0.3 }
                        }}
                    >
                        <motion.h1
                            className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-center"
                            style={{ color: '#2f616d' }}
                            variants={itemVariants}
                        >
                            Order Summary
                        </motion.h1>

                        <motion.div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4" variants={itemVariants}>
                            <motion.div
                                className="border-b pb-3 sm:pb-4"
                                variants={itemVariants}
                                whileHover={{
                                    backgroundColor: 'rgba(67, 166, 188, 0.03)',
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2" style={{ color: '#43a6bc' }}>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                                        </svg>
                                        Selected Services
                                    </div>
                                </h2>
                                <div className="flex justify-between text-xs sm:text-sm" style={{ color: '#2f616d' }}>
                                    <span>Exterior Wash</span>
                                    <span>$15.99</span>
                                </div>
                                <div className="flex justify-between text-xs sm:text-sm" style={{ color: '#2f616d' }}>
                                    <span>Interior Vacuum</span>
                                    <span>$10.99</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="border-b pb-3 sm:pb-4"
                                variants={itemVariants}
                                whileHover={{
                                    backgroundColor: 'rgba(67, 166, 188, 0.03)',
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2" style={{ color: '#43a6bc' }}>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                        </svg>
                                        Vehicle Details
                                    </div>
                                </h2>
                                <div className="flex justify-between text-xs sm:text-sm" style={{ color: '#2f616d' }}>
                                    <span>Vehicle Type</span>
                                    <span>Sedan</span>
                                </div>
                                <div className="flex justify-between text-xs sm:text-sm" style={{ color: '#2f616d' }}>
                                    <span>License Plate</span>
                                    <span>ABC-1234</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="border-b pb-3 sm:pb-4"
                                variants={itemVariants}
                                whileHover={{
                                    backgroundColor: 'rgba(67, 166, 188, 0.03)',
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2" style={{ color: '#43a6bc' }}>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Appointment
                                    </div>
                                </h2>
                                <div className="flex justify-between text-xs sm:text-sm" style={{ color: '#2f616d' }}>
                                    <span>Date</span>
                                    <span>June 20, 2025</span>
                                </div>
                                <div className="flex justify-between text-xs sm:text-sm" style={{ color: '#2f616d' }}>
                                    <span>Time</span>
                                    <span>2:30 PM</span>
                                </div>
                                <div className="flex justify-between text-xs sm:text-sm" style={{ color: '#2f616d' }}>
                                    <span>Location</span>
                                    <span>Your address</span>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                whileHover={{
                                    backgroundColor: 'rgba(67, 166, 188, 0.03)',
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2" style={{ color: '#43a6bc' }}>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        Payment
                                    </div>
                                </h2>
                                <div className="flex justify-between text-xs sm:text-sm" style={{ color: '#2f616d' }}>
                                    <span>Payment Method</span>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-4 mr-1" viewBox="0 0 24 16" fill="#43a6bc">
                                            <rect width="24" height="16" rx="2" fill="#E2E8F0" />
                                            <path d="M15 4H20V8H15V4Z" fill="#CBD5E0" />
                                        </svg>
                                        <span>Credit Card (****1234)</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                                    <span className="font-semibold text-sm sm:text-base" style={{ color: '#2f616d' }}>Subtotal</span>
                                    <span className="text-sm sm:text-base" style={{ color: '#2f616d' }}>$26.98</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm" style={{ color: '#2f616d' }}>Tax</span>
                                    <span className="text-xs sm:text-sm" style={{ color: '#2f616d' }}>$0.00</span>
                                </div>
                                <div className="flex justify-between items-center font-semibold text-base sm:text-lg mt-1 sm:mt-2" style={{ color: '#f04b41' }}>
                                    <span>Total</span>
                                    <span>$26.98</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="flex gap-2 sm:gap-4"
                            variants={itemVariants}
                        >
                            <motion.button
                                onClick={handleGoToPage4}
                                className="flex-1 px-3 sm:px-4 py-2 text-white rounded transition-colors focus:outline-none text-sm sm:text-base"
                                style={{ backgroundColor: '#2f616d' }}
                                whileHover={buttonVariants.hover}
                                whileTap={buttonVariants.tap}
                                disabled={isConfirming}
                            >
                                Back
                            </motion.button>
                            <motion.button
                                onClick={handleGoToPage5}
                                disabled={isConfirming}
                                className="flex-1 px-3 sm:px-4 py-2 text-white rounded transition-colors focus:outline-none text-sm sm:text-base"
                                style={{
                                    backgroundColor: isConfirming ? '#f04b4199' : '#f04b41',
                                    cursor: isConfirming ? 'not-allowed' : 'pointer'
                                }}
                                whileHover={isConfirming ? {} : buttonVariants.hover}
                                whileTap={isConfirming ? {} : buttonVariants.tap}
                            >
                                {isConfirming ? (
                                    <motion.div className="flex items-center justify-center gap-2">
                                        <motion.div
                                            className="w-4 h-4"
                                            animate={{
                                                rotate: 360,
                                                transition: {
                                                    repeat: Infinity,
                                                    duration: 1,
                                                    ease: "linear"
                                                }
                                            }}
                                        >
                                            <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </motion.div>
                                        <span>Confirming...</span>
                                    </motion.div>
                                ) : (
                                    <span>Confirm Order</span>
                                )}
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className="mt-3 sm:mt-4 text-center"
                            variants={itemVariants}
                        >
                            <motion.button
                                onClick={handleGoToPage1}
                                className="text-xs sm:text-sm hover:underline focus:outline-none"
                                style={{ color: '#43a6bc' }}
                                whileHover={{ scale: 1.05 }}
                            >
                                Cancel and Return to Home
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Page5;