import React, { useState } from 'react';
import bgimg2 from "../assets/bgimg/img3.jpg";
import { motion } from 'motion/react';

const Page2 = ({ navigateToPage }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        vehicleType: 'sedan',
        serviceType: 'basic',
        specialRequests: ''
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Here you would typically process the form data
        // Then navigate to the next page
        navigateToPage(3);
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-50 p-6"
            style={{
                backgroundImage: `url(${bgimg2})`,
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
                className="text-2xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Book Your Car Wash
            </motion.div>

            <motion.div
                className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className='grid grid-cols-2 gap-4'>
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                        >
                            <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                style={{ borderColor: '#43a6bc' }}
                                required
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                        >
                            <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                style={{ borderColor: '#43a6bc' }}
                                required
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                        >
                            <label htmlFor="phone" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                style={{ borderColor: '#43a6bc' }}
                                required
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.7 }}
                        >
                            <label htmlFor="vehicleType" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>Vehicle Type</label>
                            <select
                                id="vehicleType"
                                name="vehicleType"
                                value={formData.vehicleType}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                style={{ borderColor: '#43a6bc' }}
                                required
                            >
                                <option value="sedan">Sedan</option>
                                <option value="suv">SUV</option>
                                <option value="truck">Truck</option>
                                <option value="van">Van</option>
                                <option value="motorcycle">Motorcycle</option>
                            </select>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.8 }}
                        >
                            <label htmlFor="serviceType" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>Service Type</label>
                            <select
                                id="serviceType"
                                name="serviceType"
                                value={formData.serviceType}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                style={{ borderColor: '#43a6bc' }}
                                required
                            >
                                <option value="basic">Basic Wash ($20)</option>
                                <option value="premium">Premium Wash ($35)</option>
                                <option value="deluxe">Deluxe Detail ($60)</option>
                                <option value="interior">Interior Only ($25)</option>
                                <option value="exterior">Exterior Only ($15)</option>
                            </select>
                        </motion.div>

                        <motion.div
                            className="col-span-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.9 }}
                        >
                            <label htmlFor="specialRequests" className="block text-sm font-medium mb-1" style={{ color: '#2f616d' }}>Special Requests</label>
                            <textarea
                                id="specialRequests"
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                style={{ borderColor: '#43a6bc' }}
                            ></textarea>
                        </motion.div>
                    </div>

                    <motion.div
                        className="flex gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 1 }}
                    >
                        <motion.button
                            onClick={handleGoToPage1}
                            className="flex-1 px-4 py-2 text-white rounded transition-colors focus:outline-none"
                            style={{ backgroundColor: '#2f616d' }}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Back
                        </motion.button>
                        <motion.button
                            onClick={handleGoToPage3}
                            type="submit"
                            className="flex-1 px-4 py-2 text-white rounded transition-colors focus:outline-none"
                            style={{ backgroundColor: '#f04b41' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Book Appointment
                        </motion.button>
                    </motion.div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Page2;