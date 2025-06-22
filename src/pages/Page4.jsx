import React, { useState } from 'react';
import bgimg4 from "../assets/bgimg/img1.jpg";
import { motion, AnimatePresence } from 'motion/react';

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

    return (
        <motion.div
            className="flex flex-col items-center justify-center p-6"
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
            <motion.h1
                className="text-2xl font-bold mb-6 text-center"
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
            </motion.h1>

            <AnimatePresence mode="wait">
                {showSuccess ? (
                    <motion.div
                        className="bg-white rounded-lg shadow-md p-6 w-full max-w-md"
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
                                className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4"
                                variants={itemVariants}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    transition: { duration: 0.5 }
                                }}
                            >
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>
                            <motion.h2
                                className="text-xl font-bold mb-2 text-center"
                                style={{ color: '#43a6bc' }}
                                variants={itemVariants}
                            >
                                Payment Successful!
                            </motion.h2>
                            <motion.p
                                className="text-center mb-4"
                                style={{ color: '#2f616d' }}
                                variants={itemVariants}
                            >
                                Your payment has been processed successfully.
                            </motion.p>
                            <motion.p
                                className="text-center mb-4"
                                style={{ color: '#2f616d' }}
                                variants={itemVariants}
                            >
                                Redirecting to confirmation page...
                            </motion.p>
                            <motion.div
                                className="w-12 h-12"
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
                        className="bg-white rounded-lg shadow-md p-6 w-full max-w-md"
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
                            className="flex gap-4 mb-6"
                            variants={itemVariants}
                        >
                            <motion.button
                                onClick={() => setPaymentMethod('card')}
                                className="flex-1 py-2 rounded transition-colors focus:outline-none"
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
                                <motion.div className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H21C22.1046 19 23 18.1046 23 17V7C23 5.89543 22.1046 5 21 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Credit/Debit Card</span>
                                </motion.div>
                            </motion.button>
                            <motion.button
                                onClick={() => setPaymentMethod('upi')}
                                className="flex-1 py-2 rounded transition-colors focus:outline-none"
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
                                <motion.div className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                    className="space-y-4"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    key="card-form"
                                >
                                    <motion.div variants={itemVariants}>
                                        <label className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>Card Number</label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full px-3 py-2 border rounded focus:outline-none transition-all duration-300"
                                            style={{ borderColor: '#43a6bc' }}
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                        />
                                    </motion.div>
                                    <motion.div className="grid grid-cols-2 gap-4" variants={itemVariants}>
                                        <div>
                                            <label className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>Expiry Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-3 py-2 border rounded focus:outline-none transition-all duration-300"
                                                style={{ borderColor: '#43a6bc' }}
                                                value={expiryDate}
                                                onChange={(e) => setExpiryDate(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>CVV</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full px-3 py-2 border rounded focus:outline-none transition-all duration-300"
                                                style={{ borderColor: '#43a6bc' }}
                                                value={cvv}
                                                onChange={(e) => setCvv(e.target.value)}
                                            />
                                        </div>
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <label className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>Name on Card</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-3 py-2 border rounded focus:outline-none transition-all duration-300"
                                            style={{ borderColor: '#43a6bc' }}
                                            value={nameOnCard}
                                            onChange={(e) => setNameOnCard(e.target.value)}
                                        />
                                    </motion.div>
                                </motion.div>
                            )}

                            {paymentMethod === 'upi' && (
                                <motion.div
                                    className="space-y-4"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    key="upi-form"
                                >
                                    <motion.div variants={itemVariants}>
                                        <label className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>UPI ID</label>
                                        <input
                                            type="text"
                                            placeholder="username@upi"
                                            className="w-full px-3 py-2 border rounded focus:outline-none transition-all duration-300"
                                            style={{ borderColor: '#43a6bc' }}
                                        />
                                    </motion.div>
                                    <motion.div
                                        className="flex justify-center items-center py-4"
                                        variants={itemVariants}
                                    >
                                        <motion.div
                                            className="p-4 border-2 border-dashed rounded-md flex items-center justify-center"
                                            style={{ borderColor: '#43a6bc' }}
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <motion.div className="text-center">
                                                <svg className="w-10 h-10 mx-auto mb-2" style={{ color: '#43a6bc' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                <span className="text-sm" style={{ color: '#2f616d' }}>Scan QR Code</span>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            className="flex gap-4 mt-6"
                            variants={itemVariants}
                        >
                            <motion.button
                                onClick={handleGoToPage3}
                                className="flex-1 px-4 py-2 text-white rounded transition-colors focus:outline-none"
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
                                className="flex-1 px-4 py-2 text-white rounded transition-colors focus:outline-none relative overflow-hidden"
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
                                            className="w-5 h-5"
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
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Page4;