import React, { useState } from 'react';
import bgimg4 from "../assets/bgimg/img1.jpg";
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

const Page4 = ({ navigateToPage }) => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleGoToPage5 = () => {
        // Simulate payment processing
        setIsProcessing(true);
        setTimeout(() => {
            setShowSuccess(true);
            setTimeout(() => {
                setIsProcessing(false);
                navigateToPage(5);
            }, 1000);
        }, 1500);
    };

    const handleGoToPage3 = () => {
        navigateToPage(3);
    };

    // Format card number with spaces
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0; i < match.length; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    // Format expiry date
    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

        if (v.length >= 2) {
            return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
        }

        return v;
    };

    // Handle card number input
    const handleCardNumberChange = (e) => {
        const formattedValue = formatCardNumber(e.target.value);
        setCardNumber(formattedValue);
    };

    // Handle expiry date input
    const handleExpiryDateChange = (e) => {
        const formattedValue = formatExpiryDate(e.target.value);
        setExpiryDate(formattedValue);
    };

    // Handle CVV input
    const handleCVVChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 3) {
            setCvv(value);
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-50 p-3 sm:p-6"
            style={{
                backgroundImage: `url(${bgimg4})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.5,
                ease: "easeInOut"
            }}
        >
            <motion.div
                className="text-xl sm:text-2xl font-bold mb-3 sm:mb-6 text-center"
                style={{ color: '#fff' }}
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
                Payment Gateway
            </motion.div>

            <AnimatePresence mode="wait">
                {showSuccess ? (
                    <motion.div
                        className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full max-w-md"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 25
                            }
                        }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <motion.div
                            className="flex flex-col items-center justify-center"
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <motion.div
                                className="w-12 h-12 sm:w-16 sm:h-16 bg-green-50 rounded-full flex items-center justify-center mb-3 sm:mb-4"
                                variants={itemVariants}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    transition: { duration: 0.5 }
                                }}
                            >
                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>
                            <motion.h2
                                className="text-lg sm:text-xl font-bold mb-2 text-center"
                                style={{ color: '#43a6bc' }}
                                variants={itemVariants}
                            >
                                Payment Successful!
                            </motion.h2>
                            <motion.p
                                className="text-sm sm:text-base text-center mb-3 sm:mb-4"
                                style={{ color: '#2f616d' }}
                                variants={itemVariants}
                            >
                                Your payment has been processed successfully.
                            </motion.p>
                            <motion.p
                                className="text-sm sm:text-base text-center mb-3 sm:mb-4"
                                style={{ color: '#2f616d' }}
                                variants={itemVariants}
                            >
                                Redirecting to confirmation page...
                            </motion.p>
                            <motion.div
                                className="w-8 h-8 sm:w-12 sm:h-12"
                                animate={{
                                    rotate: 360,
                                    transition: {
                                        repeat: Infinity,
                                        duration: 1.5,
                                        ease: "linear"
                                    }
                                }}
                            >
                                <svg className="w-full h-full text-gray-300" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </motion.div>
                        </motion.div>
                    </motion.div>
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
                        <motion.div
                            className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6"
                            variants={itemVariants}
                        >
                            <motion.button
                                onClick={() => setPaymentMethod('card')}
                                className="flex-1 py-2 px-3 rounded transition-colors focus:outline-none text-sm sm:text-base"
                                style={{
                                    backgroundColor: paymentMethod === 'card' ? '#43a6bc' : '#e2e8f0',
                                    color: paymentMethod === 'card' ? 'white' : '#2f616d'
                                }}
                                whileHover={buttonVariants.hover}
                                whileTap={buttonVariants.tap}
                                animate={paymentMethod === 'card' ? {
                                    y: [0, -3, 0],
                                    transition: { duration: 0.3 }
                                } : {}}
                            >
                                <motion.div className="flex items-center justify-center gap-1 sm:gap-2">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H21C22.1046 19 23 18.1046 23 17V7C23 5.89543 22.1046 5 21 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Credit/Debit Card</span>
                                </motion.div>
                            </motion.button>
                            <motion.button
                                onClick={() => setPaymentMethod('upi')}
                                className="flex-1 py-2 px-3 rounded transition-colors focus:outline-none text-sm sm:text-base"
                                style={{
                                    backgroundColor: paymentMethod === 'upi' ? '#43a6bc' : '#e2e8f0',
                                    color: paymentMethod === 'upi' ? 'white' : '#2f616d'
                                }}
                                whileHover={buttonVariants.hover}
                                whileTap={buttonVariants.tap}
                                animate={paymentMethod === 'upi' ? {
                                    y: [0, -3, 0],
                                    transition: { duration: 0.3 }
                                } : {}}
                            >
                                <motion.div className="flex items-center justify-center gap-1 sm:gap-2">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 9V7C17 5.89543 16.1046 5 15 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M13 21H19C20.1046 21 21 20.1046 21 19V13C21 11.8954 20.1046 11 19 11H13C11.8954 11 11 11.8954 11 13V19C11 20.1046 11.8954 21 13 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>UPI</span>
                                </motion.div>
                            </motion.button>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            {paymentMethod === 'card' && (
                                <motion.div
                                    className="space-y-3 sm:space-y-4"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    key="card-form"
                                >
                                    <motion.div variants={itemVariants}>
                                        <label className="block text-xs sm:text-sm font-medium mb-1" style={{ color: '#2f616d' }}>Card Number</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                className="w-full pl-3 pr-9 py-2 border rounded focus:outline-none transition-all duration-300 text-sm sm:text-base"
                                                style={{ borderColor: '#43a6bc' }}
                                                value={cardNumber}
                                                onChange={handleCardNumberChange}
                                                maxLength={19} // 16 digits + 3 spaces
                                            />
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                <svg className="h-4 w-6 sm:h-5 sm:w-7 text-gray-400" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="24" height="16" rx="2" fill="#E2E8F0" />
                                                    <path d="M15 4H20V8H15V4Z" fill="#CBD5E0" />
                                                </svg>
                                            </div>
                                        </div>
                                    </motion.div>
                                    <motion.div className="grid grid-cols-2 gap-3 sm:gap-4" variants={itemVariants}>
                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium mb-1" style={{ color: '#2f616d' }}>Expiry Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-3 py-2 border rounded focus:outline-none transition-all duration-300 text-sm sm:text-base"
                                                style={{ borderColor: '#43a6bc' }}
                                                value={expiryDate}
                                                onChange={handleExpiryDateChange}
                                                maxLength={5} // MM/YY format
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium mb-1" style={{ color: '#2f616d' }}>CVV</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                    className="w-full pl-3 pr-8 py-2 border rounded focus:outline-none transition-all duration-300 text-sm sm:text-base"
                                                    style={{ borderColor: '#43a6bc' }}
                                                    value={cvv}
                                                    onChange={handleCVVChange}
                                                    maxLength={3}
                                                />
                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-help">
                                                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                                        <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <label className="block text-xs sm:text-sm font-medium mb-1" style={{ color: '#2f616d' }}>Name on Card</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-3 py-2 border rounded focus:outline-none transition-all duration-300 text-sm sm:text-base"
                                            style={{ borderColor: '#43a6bc' }}
                                            value={nameOnCard}
                                            onChange={(e) => setNameOnCard(e.target.value)}
                                        />
                                    </motion.div>
                                    <motion.div
                                        className="mt-2 text-xs text-gray-500 flex items-center"
                                        variants={itemVariants}
                                    >
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <span>Your payment information is secure</span>
                                    </motion.div>
                                </motion.div>
                            )}

                            {paymentMethod === 'upi' && (
                                <motion.div
                                    className="space-y-3 sm:space-y-4"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    key="upi-form"
                                >
                                    <motion.div variants={itemVariants}>
                                        <label className="block text-xs sm:text-sm font-medium mb-1" style={{ color: '#2f616d' }}>UPI ID</label>
                                        <input
                                            type="text"
                                            placeholder="username@upi"
                                            className="w-full px-3 py-2 border rounded focus:outline-none transition-all duration-300 text-sm sm:text-base"
                                            style={{ borderColor: '#43a6bc' }}
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Enter your UPI ID (e.g., mobilenumber@upi)</p>
                                    </motion.div>
                                    <motion.div
                                        className="flex justify-center items-center py-3 sm:py-4"
                                        variants={itemVariants}
                                    >
                                        <motion.div
                                            className="p-3 sm:p-4 border-2 border-dashed rounded-md flex items-center justify-center"
                                            style={{ borderColor: '#43a6bc' }}
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <motion.div className="text-center">
                                                <svg className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2" style={{ color: '#43a6bc' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                <span className="text-xs sm:text-sm" style={{ color: '#2f616d' }}>Scan QR Code</span>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                    <motion.div
                                        className="flex flex-wrap justify-center gap-2 sm:gap-3"
                                        variants={itemVariants}
                                    >
                                        {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                                            <motion.div
                                                key={app}
                                                className="px-3 py-1 sm:px-4 sm:py-2 border rounded-full text-xs sm:text-sm"
                                                style={{ borderColor: '#43a6bc', color: '#2f616d' }}
                                                whileHover={{
                                                    backgroundColor: '#f0f9ff',
                                                    scale: 1.05
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {app}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            className="flex gap-2 sm:gap-4 mt-4 sm:mt-6"
                            variants={itemVariants}
                        >
                            <motion.button
                                onClick={handleGoToPage3}
                                className="flex-1 px-3 sm:px-4 py-2 text-white rounded transition-colors focus:outline-none text-sm sm:text-base"
                                style={{ backgroundColor: '#2f616d' }}
                                whileHover={buttonVariants.hover}
                                whileTap={buttonVariants.tap}
                                disabled={isProcessing}
                            >
                                Back
                            </motion.button>
                            <motion.button
                                onClick={handleGoToPage5}
                                disabled={isProcessing}
                                className="flex-1 px-3 sm:px-4 py-2 text-white rounded transition-colors focus:outline-none relative overflow-hidden text-sm sm:text-base"
                                style={{
                                    backgroundColor: isProcessing ? '#f04b4199' : '#f04b41',
                                    cursor: isProcessing ? 'not-allowed' : 'pointer'
                                }}
                                whileHover={isProcessing ? {} : buttonVariants.hover}
                                whileTap={isProcessing ? {} : buttonVariants.tap}
                            >
                                {isProcessing ? (
                                    <motion.div className="flex items-center justify-center gap-2">
                                        <motion.div
                                            className="w-4 h-4 sm:w-5 sm:h-5"
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
                                        <span>Processing...</span>
                                    </motion.div>
                                ) : (
                                    <>
                                        <motion.span
                                            className="relative z-10"
                                            initial={{ y: 0 }}
                                            whileHover={{ y: -2 }}
                                        >
                                            Pay Now
                                        </motion.span>
                                        <motion.div
                                            className="absolute bottom-0 left-0 h-1 bg-white"
                                            initial={{ width: 0 }}
                                            whileHover={{
                                                width: '100%',
                                                transition: { duration: 0.3 }
                                            }}
                                            style={{ opacity: 0.3 }}
                                        />
                                    </>
                                )}
                            </motion.button>
                        </motion.div>

                        {/* Order summary - simplified for mobile */}
                        <motion.div
                            className="mt-4 pt-4 border-t border-gray-100"
                            variants={itemVariants}
                        >
                            <h3 className="text-xs sm:text-sm font-medium mb-2" style={{ color: '#2f616d' }}>Order Summary</h3>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs sm:text-sm">
                                    <span className="text-gray-600">Car Wash Service:</span>
                                    <span className="font-medium">₹499</span>
                                </div>
                                <div className="flex justify-between text-xs sm:text-sm">
                                    <span className="text-gray-600">Taxes:</span>
                                    <span className="font-medium">₹89.82</span>
                                </div>
                                <div className="flex justify-between text-sm sm:text-base font-semibold mt-2 pt-2 border-t border-gray-100">
                                    <span style={{ color: '#2f616d' }}>Total:</span>
                                    <span style={{ color: '#f04b41' }}>₹588.82</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Page4;