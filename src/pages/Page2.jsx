import React, { useState } from 'react';
import bgimg2 from "../assets/bgimg/img3.jpg";
import { motion, AnimatePresence } from 'framer-motion';

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

// Updated button variants with the gradient hover effect included
const buttonVariants = {
    hover: {
        scale: 1.05,
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
        background: 'linear-gradient(90deg, #f04b41 0%, #f04b41 85%, #ff6b63 100%)'
    },
    tap: { scale: 0.95, boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" },
    disabled: { scale: 1, opacity: 0.7 }
};

const Page2 = ({ navigateToPage }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        vehicleType: 'sedan',
        serviceType: 'basic',
        specialRequests: ''
    });

    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: 'info' // 'success', 'error', 'info'
    });

    const handleGoToPage3 = () => {
        navigateToPage(3);
    };

    const handleGoToPage1 = () => {
        navigateToPage(1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Form validation
        if (!formData.name || !formData.email || !formData.phone) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Validate phone number (simple validation)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            showNotification('Please enter a valid 10-digit phone number', 'error');
            return;
        }

        console.log('Form submitted:', formData);
        // Here you would typically process the form data
        showNotification('Booking information saved!', 'success');

        // Navigate after a short delay to show the success message
        setTimeout(() => {
            navigateToPage(3);
        }, 1000);
    };

    // Vehicle type icons
    const vehicleIcons = {
        sedan: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
            </svg>
        ),
        suv: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h8.25c1.035 0 1.875-.84 1.875-1.875V15z" />
                <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
            </svg>
        ),
        truck: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h8.25c1.035 0 1.875-.84 1.875-1.875V15z" />
                <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
            </svg>
        ),
        van: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h8.25c1.035 0 1.875-.84 1.875-1.875V15z" />
                <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
            </svg>
        ),
        motorcycle: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M19.5 9.75a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0v2.69l4.72-4.72a.75.75 0 111.06 1.06L16.06 9h2.69a.75.75 0 01.75.75z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
            </svg>
        )
    };

    // Service type icons
    const serviceIcons = {
        basic: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
            </svg>
        ),
        premium: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
            </svg>
        ),
        deluxe: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
            </svg>
        ),
        interior: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
        ),
        exterior: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
            </svg>
        )
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-50 p-3 sm:p-6"
            style={{
                backgroundImage: `url(${bgimg2})`,
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
                className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center text-white"
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
                Book Your Car Wash
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
                    className="w-full bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 mx-auto"
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                            <motion.div
                                className="col-span-1"
                                variants={itemVariants}
                            >
                                <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none transition-all duration-300"
                                    style={{ borderColor: '#43a6bc' }}
                                    required
                                    placeholder="Your full name"
                                />
                            </motion.div>

                            <motion.div
                                className="col-span-1"
                                variants={itemVariants}
                            >
                                <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none transition-all duration-300"
                                    style={{ borderColor: '#43a6bc' }}
                                    required
                                    placeholder="example@email.com"
                                />
                            </motion.div>

                            <motion.div
                                className="col-span-1"
                                variants={itemVariants}
                            >
                                <label htmlFor="phone" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none transition-all duration-300"
                                    style={{ borderColor: '#43a6bc' }}
                                    required
                                    placeholder="10-digit number"
                                    pattern="[0-9]{10}"
                                    maxLength="10"
                                />
                            </motion.div>

                            <motion.div
                                className="col-span-1"
                                variants={itemVariants}
                            >
                                <label htmlFor="vehicleType" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>
                                    Vehicle Type
                                </label>
                                <div className="relative">
                                    <select
                                        id="vehicleType"
                                        name="vehicleType"
                                        value={formData.vehicleType}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none transition-all duration-300 appearance-none pr-10"
                                        style={{ borderColor: '#43a6bc' }}
                                        required
                                    >
                                        <option value="sedan">Sedan</option>
                                        <option value="suv">SUV</option>
                                        <option value="truck">Truck</option>
                                        <option value="van">Van</option>
                                        <option value="motorcycle">Motorcycle</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" style={{ color: '#2f616d' }}>
                                        {vehicleIcons[formData.vehicleType]}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="col-span-full sm:col-span-1"
                                variants={itemVariants}
                            >
                                <label htmlFor="serviceType" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>
                                    Service Type
                                </label>
                                <div className="relative">
                                    <select
                                        id="serviceType"
                                        name="serviceType"
                                        value={formData.serviceType}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none transition-all duration-300 appearance-none pr-10"
                                        style={{ borderColor: '#43a6bc' }}
                                        required
                                    >
                                        <option value="basic">Basic Wash ($20)</option>
                                        <option value="premium">Premium Wash ($35)</option>
                                        <option value="deluxe">Deluxe Detail ($60)</option>
                                        <option value="interior">Interior Only ($25)</option>
                                        <option value="exterior">Exterior Only ($15)</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" style={{ color: '#2f616d' }}>
                                        {serviceIcons[formData.serviceType]}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="col-span-full"
                                variants={itemVariants}
                            >
                                <label htmlFor="specialRequests" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>
                                    Special Requests
                                </label>
                                <textarea
                                    id="specialRequests"
                                    name="specialRequests"
                                    value={formData.specialRequests}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none transition-all duration-300"
                                    style={{ borderColor: '#43a6bc' }}
                                    placeholder="Any special instructions or requests?"
                                ></textarea>
                            </motion.div>
                        </div>

                        <motion.div
                            className="flex gap-2 sm:gap-4 pt-2"
                            variants={itemVariants}
                        >
                            <motion.button
                                type="button"
                                onClick={handleGoToPage1}
                                className="flex-1 px-2 sm:px-4 py-2 text-white rounded transition-colors focus:outline-none text-sm sm:text-base"
                                style={{ backgroundColor: '#2f616d' }}
                                whileHover={buttonVariants.hover}
                                whileTap={buttonVariants.tap}
                            >
                                Back
                            </motion.button>
                            <motion.button
                                type="submit"
                                className="flex-1 px-2 sm:px-4 py-2 text-white rounded transition-colors focus:outline-none text-sm sm:text-base"
                                style={{ backgroundColor: '#f04b41' }}
                                whileHover={buttonVariants.hover}
                                whileTap={buttonVariants.tap}
                            >
                                Book Appointment
                            </motion.button>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.div>

            {/* Enhanced notification component with polished animation */}
            <AnimatePresence>
                {notification.show && (
                    <motion.div
                        className="fixed bottom-4 right-4 max-w-xs sm:max-w-sm px-4 sm:px-6 py-3 rounded-md shadow-lg z-50"
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
                                    <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {notification.type === 'error' && (
                                    <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {notification.type === 'info' && (
                                    <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </motion.div>
                            <motion.p
                                className="text-sm sm:text-base"
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

export default Page2;