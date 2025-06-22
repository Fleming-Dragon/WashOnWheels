import React, { useState } from 'react';
import bgimg5 from "../assets/bgimg/img2.jpg";
import { motion } from 'motion/react';

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
            className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="rounded-full p-3 mb-4" style={{ backgroundColor: '#e6f7f1' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#f04b41' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#f04b41' }}>Booking Successful!</h2>
            <p className="text-center mb-4" style={{ color: '#2f616d' }}>
                Your car wash appointment has been confirmed for June 20, 2025 at 2:30 PM.
            </p>
            <p className="text-center mb-6" style={{ color: '#2f616d' }}>
                A confirmation has been sent to your email. Your booking reference number is <span className="font-semibold">WOW-12345</span>.
            </p>
            <div className="border-t border-gray-200 pt-4 w-full">
                <h3 className="font-semibold mb-2" style={{ color: '#2f616d' }}>What's Next?</h3>
                <ul className="list-disc list-inside mb-6" style={{ color: '#2f616d' }}>
                    <li>Arrive 5 minutes before your scheduled time</li>
                    <li>Look for our mobile washing station at your location</li>
                    <li>Have your reference number ready</li>
                </ul>
            </div>
            <motion.button
                onClick={handleGoToPage1}
                className="w-full px-4 py-2 text-white rounded transition-colors focus:outline-none"
                style={{ backgroundColor: '#43a6bc' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Return to Home
            </motion.button>
        </motion.div>
    );

    return (
        <motion.div
            className="flex flex-col items-center justify-center p-6"
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
            {isBookingConfirmed ? (
                <BookingSuccessful />
            ) : (
                <motion.div
                    className="bg-white rounded-lg shadow-md p-6 w-full max-w-md"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: '#2f616d' }}>Order Summary</h1>

                    <div className="mb-6 space-y-4">
                        <div className="border-b pb-4">
                            <h2 className="text-lg font-semibold mb-2" style={{ color: '#43a6bc' }}>Selected Services</h2>
                            <div className="flex justify-between" style={{ color: '#2f616d' }}>
                                <span>Exterior Wash</span>
                                <span>$15.99</span>
                            </div>
                            <div className="flex justify-between" style={{ color: '#2f616d' }}>
                                <span>Interior Vacuum</span>
                                <span>$10.99</span>
                            </div>
                        </div>

                        <div className="border-b pb-4">
                            <h2 className="text-lg font-semibold mb-2" style={{ color: '#43a6bc' }}>Vehicle Details</h2>
                            <div className="flex justify-between" style={{ color: '#2f616d' }}>
                                <span>Vehicle Type</span>
                                <span>Sedan</span>
                            </div>
                            <div className="flex justify-between" style={{ color: '#2f616d' }}>
                                <span>License Plate</span>
                                <span>ABC-1234</span>
                            </div>
                        </div>

                        <div className="border-b pb-4">
                            <h2 className="text-lg font-semibold mb-2" style={{ color: '#43a6bc' }}>Appointment</h2>
                            <div className="flex justify-between" style={{ color: '#2f616d' }}>
                                <span>Date</span>
                                <span>June 20, 2025</span>
                            </div>
                            <div className="flex justify-between" style={{ color: '#2f616d' }}>
                                <span>Time</span>
                                <span>2:30 PM</span>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-2" style={{ color: '#43a6bc' }}>Payment</h2>
                            <div className="flex justify-between" style={{ color: '#2f616d' }}>
                                <span>Payment Method</span>
                                <span>Credit Card (****1234)</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg mt-2" style={{ color: '#2f616d' }}>
                                <span>Total</span>
                                <span>$26.98</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <motion.button
                            onClick={handleGoToPage4}
                            className="flex-1 px-4 py-2 text-white rounded transition-colors focus:outline-none"
                            style={{ backgroundColor: '#2f616d' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Back
                        </motion.button>
                        <motion.button
                            onClick={handleGoToPage5}
                            disabled={isConfirming}
                            className="flex-1 px-4 py-2 text-white rounded transition-colors focus:outline-none"
                            style={{
                                backgroundColor: isConfirming ? '#f04b4199' : '#f04b41',
                                cursor: isConfirming ? 'not-allowed' : 'pointer'
                            }}
                            whileHover={{ scale: isConfirming ? 1 : 1.05 }}
                            whileTap={{ scale: isConfirming ? 1 : 0.95 }}
                        >
                            {isConfirming ? 'Confirming...' : 'Confirm Order'}
                        </motion.button>
                    </div>

                    <div className="mt-4 text-center">
                        <motion.button
                            onClick={handleGoToPage1}
                            className="hover:underline focus:outline-none"
                            style={{ color: '#43a6bc' }}
                            whileHover={{ scale: 1.05 }}
                        >
                            Cancel and Return to Home
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Page5;