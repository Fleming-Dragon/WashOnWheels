import React, { useState } from 'react';
import bgimg3 from "../assets/bgimg/img4.jpg"; // Import the background image
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

const Page3 = ({ navigateToPage }) => {
    const [addressData, setAddressData] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        additionalInfo: ''
    });

    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: 'info' // 'success', 'error', 'info'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGoToPage2 = () => {
        navigateToPage(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Address submitted:', addressData);
        showNotification('Address saved successfully!', 'success');
        setTimeout(() => {
            navigateToPage(4);
        }, 1000);
    };

    const showNotification = (message, type = 'info') => {
        setNotification({
            show: true,
            message,
            type
        });

        // Auto-hide notification after 5 seconds
        setTimeout(() => {
            setNotification(prev => ({ ...prev, show: false }));
        }, 5000);
    };

    const getLocation = () => {
        if (!navigator.geolocation) {
            showNotification('Geolocation is not supported by your browser', 'error');
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    // Get coordinates
                    const { latitude, longitude } = position.coords;

                    // Use OpenStreetMap Nominatim API (free)
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
                        {
                            headers: {
                                'Accept-Language': 'en-US,en',
                                'User-Agent': 'WashOnWheels/1.0' // Important: Nominatim requires a user-agent
                            }
                        }
                    );

                    if (!response.ok) {
                        throw new Error('Failed to fetch address data');
                    }

                    const data = await response.json();
                    const address = data.address;

                    // Map API response to address fields
                    setAddressData({
                        street: `${address.house_number || ''} ${address.road || ''}`.trim(),
                        city: address.city || address.town || address.village || '',
                        state: address.state || '',
                        zipCode: address.postcode || '',
                        country: address.country || '',
                        additionalInfo: ''
                    });

                    setLoading(false);
                    showNotification('Location retrieved successfully!', 'success');
                } catch (error) {
                    console.error('Error fetching address:', error);
                    setLoading(false);
                    showNotification('Failed to retrieve address information', 'error');
                }
            },
            (error) => {
                setLoading(false);
                let message = 'Unknown error';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = 'Location permission denied';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = 'Location information unavailable';
                        break;
                    case error.TIMEOUT:
                        message = 'Location request timed out';
                        break;
                    default:
                        message = 'An unknown error occurred';
                        break;
                }

                showNotification(message, 'error');
            }
        );
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-50 p-6"
            style={{
                backgroundImage: `url(${bgimg3})`,
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
            {/* Page title with floating animation */}
            <motion.div
                className="text-2xl font-bold mb-4 text-center"
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
                Delivery Address
            </motion.div>

            {/* Content container with variants for staggered children */}
            <motion.div
                className="z-10 relative w-full max-w-md"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <motion.div
                    className="w-full bg-white rounded-lg shadow-md p-6 mb-6 mx-auto"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            delay: 0.2
                        }
                    }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    whileHover={{
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        transition: { duration: 0.3 }
                    }}
                >
                    {/* Location button with ripple effect */}
                    <motion.div
                        className="mb-4"
                        variants={itemVariants}
                    >
                        <motion.button
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-md text-white overflow-hidden relative"
                            style={{
                                backgroundColor: loading ? '#53abc7' : '#43a6bc',
                                cursor: loading ? 'not-allowed' : 'pointer',
                            }}
                            onClick={getLocation}
                            disabled={loading}
                            whileHover={loading ? {} : buttonVariants.hover}
                            whileTap={loading ? {} : buttonVariants.tap}
                            variants={itemVariants}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <motion.span
                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        Getting Location...
                                    </motion.span>
                                </>
                            ) : (
                                <>
                                    <motion.div
                                        initial={{ scale: 1 }}
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </motion.div>
                                    <span>Get Current Location</span>
                                </>
                            )}
                        </motion.button>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Form fields with staggered animations */}
                            <motion.div
                                className="col-span-2"
                                variants={itemVariants}
                            >
                                <label htmlFor="street" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    value={addressData.street}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none transition-all duration-300"
                                    style={{ borderColor: '#43a6bc' }}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label htmlFor="city" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={addressData.city}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none transition-all duration-300"
                                    style={{ borderColor: '#43a6bc' }}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label htmlFor="state" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>
                                    State/Province
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={addressData.state}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none transition-all duration-300"
                                    style={{ borderColor: '#43a6bc' }}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label htmlFor="zipCode" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>
                                    ZIP/Postal Code
                                </label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    value={addressData.zipCode}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none transition-all duration-300"
                                    style={{ borderColor: '#43a6bc' }}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label htmlFor="country" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={addressData.country}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none transition-all duration-300"
                                    style={{ borderColor: '#43a6bc' }}
                                />
                            </motion.div>

                            <motion.div
                                className="col-span-2"
                                variants={itemVariants}
                            >
                                <label htmlFor="additionalInfo" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>
                                    Additional Information
                                </label>
                                <textarea
                                    id="additionalInfo"
                                    name="additionalInfo"
                                    value={addressData.additionalInfo}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none transition-all duration-300"
                                    style={{ borderColor: '#43a6bc' }}
                                ></textarea>
                            </motion.div>
                        </div>

                        <motion.div
                            className="flex gap-4 pt-2"
                            variants={itemVariants}
                        >
                            <motion.button
                                type="button"
                                onClick={handleGoToPage2}
                                className="flex-1 px-4 py-2 text-white rounded transition-colors focus:outline-none"
                                style={{ backgroundColor: '#2f616d' }}
                                whileHover={buttonVariants.hover}
                                whileTap={buttonVariants.tap}
                            >
                                Back
                            </motion.button>
                            <motion.button
                                type="submit"
                                className="flex-1 px-4 py-2 text-white rounded transition-colors focus:outline-none"
                                style={{ backgroundColor: '#f04b41' }}
                                whileHover={buttonVariants.hover}
                                whileTap={buttonVariants.tap}
                                initial={{ background: '#f04b41' }}
                                whileHover={{
                                    background: 'linear-gradient(90deg, #f04b41 0%, #f04b41 85%, #ff6b63 100%)',
                                }}
                            >
                                Continue
                            </motion.button>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.div>

            {/* Enhanced notification component with polished animation */}
            <AnimatePresence>
                {notification.show && (
                    <motion.div
                        className="fixed bottom-4 right-4 px-6 py-3 rounded-md shadow-lg z-50"
                        style={{
                            backgroundColor: notification.type === 'success' ? '#e8f7f1' :
                                notification.type === 'error' ? '#fde8e8' : '#e8f4fd',
                            borderLeft: `4px solid ${notification.type === 'success' ? '#f04b41' :
                                notification.type === 'error' ? '#f04b41' : '#43a6bc'}`,
                            color: notification.type === 'success' ? '#2f616d' :
                                notification.type === 'error' ? '#f04b41' : '#2f616d'
                        }}
                        initial={{ opacity: 0, y: 50, x: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            x: 0,
                            transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 25
                            }
                        }}
                        exit={{
                            opacity: 0,
                            x: 100,
                            transition: {
                                duration: 0.3
                            }
                        }}
                    >
                        <div className="flex items-center">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        delay: 0.2,
                                        type: "spring",
                                        stiffness: 500
                                    }
                                }}
                            >
                                {notification.type === 'success' && (
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {notification.type === 'error' && (
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {notification.type === 'info' && (
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0, x: 10 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        delay: 0.3,
                                        duration: 0.3
                                    }
                                }}
                            >
                                {notification.message}
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Page3;