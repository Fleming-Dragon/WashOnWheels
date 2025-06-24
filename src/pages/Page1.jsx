import React, { useState, useEffect } from 'react';
import { DayPicker } from "react-day-picker";
import bgimg2 from "../assets/bgimg/img2.jpg";
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

const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.95, boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" },
    disabled: { scale: 1, opacity: 0.7 }
};

const TimeSlot = ({ time, selected, onClick }) => (
    <motion.button
        className={`px-3 sm:px-4 py-2 m-1 rounded-md transition-colors text-sm sm:text-base ${selected ? 'text-white' : 'bg-white border hover:bg-opacity-80'
            }`}
        style={{
            backgroundColor: selected ? '#f04b41' : 'white',
            borderColor: '#43a6bc',
            color: selected ? 'white' : '#2f616d'
        }}
        onClick={() => onClick(time)}
        whileHover={selected ? {} : { scale: 1.05 }}
        whileTap={selected ? {} : { scale: 0.95 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
    >
        {time}
    </motion.button>
);

// Predefined available dates - replace with your actual available dates
const AVAILABLE_DATES = [
    new Date(2025, 5, 16), // June 16, 2025
    new Date(2025, 5, 17), // June 17, 2025
    new Date(2025, 5, 18), // June 18, 2025
    new Date(2025, 5, 20), // June 20, 2025
    new Date(2025, 5, 22), // June 22, 2025
    new Date(2025, 5, 23), // June 23, 2025
    new Date(2025, 5, 25), // June 25, 2025
    new Date(2025, 5, 29), // June 29, 2025
    new Date(2025, 5, 30), // June 30, 2025
];

// Predefined fully booked dates - these dates are available but have no time slots
const FULLY_BOOKED_DATES = [
    new Date(2025, 5, 19), // June 19, 2025
    new Date(2025, 5, 21), // June 21, 2025
    new Date(2025, 5, 24), // June 24, 2025
    new Date(2025, 5, 27), // June 27, 2025
    new Date(2025, 5, 28), // June 28, 2025
    new Date(2025, 5, 26), // June 26, 2025
];

// Predefined available time slots for specific dates
// Format: { 'YYYY-MM-DD': ['9:00 AM', '10:00 AM', ...] }
const AVAILABLE_TIME_SLOTS = {
    '2025-06-16': ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
    '2025-06-17': ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '4:00 PM'],
    '2025-06-18': ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '4:00 PM'],
    '2025-06-20': ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM'],
    '2025-06-22': ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
    '2025-06-23': ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '4:00 PM'],
    '2025-06-25': ['9:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
    '2025-06-29': ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
    '2025-06-30': ['9:00 AM', '10:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
};

const Page1 = ({ navigateToPage }) => {
    const [selectedDate, setSelectedDate] = useState();
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [dateHasTimeSlots, setDateHasTimeSlots] = useState(false);

    // Set available dates on component mount
    useEffect(() => {
        setAvailableDates(AVAILABLE_DATES);
    }, []);

    // Generate time slots for the selected date
    useEffect(() => {
        if (selectedDate) {
            // Check if the selected date is fully booked
            const isFullyBooked = FULLY_BOOKED_DATES.some(
                bookedDate =>
                    bookedDate.getDate() === selectedDate.getDate() &&
                    bookedDate.getMonth() === selectedDate.getMonth() &&
                    bookedDate.getFullYear() === selectedDate.getFullYear()
            );

            if (isFullyBooked) {
                setAvailableTimeSlots([]);
                setDateHasTimeSlots(false);
            } else {
                // Format the date as YYYY-MM-DD to match the keys in AVAILABLE_TIME_SLOTS
                const dateKey = selectedDate.toISOString().split('T')[0];

                // Get predefined time slots for the selected date, or use default slots
                const slots = AVAILABLE_TIME_SLOTS[dateKey] || generateDefaultTimeSlots();

                setAvailableTimeSlots(slots);
                setDateHasTimeSlots(true);
            }
        } else {
            setAvailableTimeSlots([]);
            setDateHasTimeSlots(false);
        }

        // Reset time selection when date changes
        setSelectedTime(null);
    }, [selectedDate]);

    // Helper function to generate default time slots if not specified
    const generateDefaultTimeSlots = () => {
        const slots = [];
        for (let hour = 9; hour <= 17; hour++) {
            const displayHour = hour > 12 ? hour - 12 : hour;
            const amPm = hour < 12 ? 'AM' : 'PM';
            slots.push(`${displayHour}:00 ${amPm}`);
        }
        return slots;
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleGoToPage2 = () => {
        // You could pass the booking details to the next page if needed
        navigateToPage(2);
    };

    // Custom modifiers for the day picker
    const modifiers = {
        available: availableDates,
    };

    // Custom styles for different date states
    const modifiersStyles = {
        available: {
            fontWeight: "bold",
            color: "#2f616d" // Dark blue color for available dates
        },
        disabled: {
            color: "#9ca3af", // Gray for unavailable dates
        },
        selected: {
            backgroundColor: "#f04b41", // Red for selected date
            color: "white"
        }
    };

    // Disable unavailable dates
    const disabledDays = {
        before: new Date(), // Disable past dates
        // A function that returns true for dates not in availableDates
        filter: (date) => !availableDates.some(
            availableDate =>
                availableDate.getDate() === date.getDate() &&
                availableDate.getMonth() === date.getMonth() &&
                availableDate.getFullYear() === date.getFullYear()
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
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="text-xl sm:text-2xl font-bold mb-3 sm:mb-6 text-white text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 0.2
                    }
                }}
            >
                Book Your Service
            </motion.div>

            <motion.div
                className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 w-full max-w-3xl'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {/* Booking Calendar Component - more compact on mobile */}
                <motion.div
                    className="w-full md:max-w-xs mx-auto p-3 sm:p-4 bg-white rounded-lg shadow-md mb-3 sm:mb-6 self-center"
                    variants={itemVariants}
                    whileHover={{
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        transition: { duration: 0.3 }
                    }}
                >
                    <motion.h2
                        className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-center sm:text-left"
                        style={{ color: '#43a6bc' }}
                        variants={itemVariants}
                    >
                        Select a Date
                    </motion.h2>
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center"
                    >
                        <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={disabledDays}
                            modifiers={modifiers}
                            modifiersStyles={modifiersStyles}
                            styles={{
                                caption: { color: "#43a6bc" },
                                day_selected: { backgroundColor: "#f04b41" }
                            }}
                            classNames={{
                                months: "flex flex-col",
                                month: "space-y-1 sm:space-y-2",
                                table: "w-full border-collapse",
                                head_row: "flex",
                                head_cell: "text-xs sm:text-sm w-7 sm:w-8 h-7 sm:h-8 text-center font-semibold text-gray-500",
                                row: "flex",
                                cell: "text-xs sm:text-sm w-7 sm:w-8 h-7 sm:h-8 text-center",
                                day: "w-7 sm:w-8 h-7 sm:h-8 rounded-full hover:bg-gray-100 transition text-xs sm:text-sm",
                                day_selected: "text-white",
                                nav_button: "hover:text-gray-800 h-6 w-6",
                                nav: "flex justify-between items-center",
                                caption_label: "text-sm sm:text-base font-medium",
                                caption: "flex justify-center py-2 mb-1"
                            }}
                        />
                    </motion.div>

                    <AnimatePresence>
                        {selectedDate && (
                            <motion.div
                                className="mt-1 sm:mt-2 text-center text-xs sm:text-sm"
                                style={{ color: '#2f616d' }}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                Selected: {selectedDate.toLocaleDateString()}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        className="mt-1 sm:mt-2 text-xs text-gray-500 flex justify-center space-x-2"
                        variants={itemVariants}
                    >
                        <span><span className="inline-block w-2 h-2 sm:w-3 sm:h-3 border rounded-full mr-1" style={{ backgroundColor: '#2f616d', borderColor: '#2f616d' }}></span> Available</span>
                        <span><span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 rounded-full mr-1"></span> Unavailable</span>
                        <span><span className="inline-block w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1" style={{ backgroundColor: '#f04b41' }}></span> Selected</span>
                    </motion.div>
                </motion.div>

                {/* Time Slot Selection - more compact on mobile */}
                <AnimatePresence>
                    {selectedDate && (
                        <motion.div
                            className="w-full max-w-md p-3 sm:p-4 bg-white rounded-lg shadow-md mb-3 sm:mb-6"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25
                                }
                            }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            whileHover={{
                                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.h2
                                className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-center sm:text-left"
                                style={{ color: '#43a6bc' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Select a Time
                            </motion.h2>

                            {dateHasTimeSlots ? (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={containerVariants}
                                >
                                    <motion.div
                                        className="flex flex-wrap justify-center"
                                        variants={itemVariants}
                                    >
                                        {availableTimeSlots.map((time) => (
                                            <TimeSlot
                                                key={time}
                                                time={time}
                                                selected={selectedTime === time}
                                                onClick={handleTimeSelect}
                                            />
                                        ))}
                                    </motion.div>

                                    <AnimatePresence>
                                        {selectedTime && (
                                            <motion.div
                                                className="mt-2 sm:mt-3 text-center text-xs sm:text-sm"
                                                style={{ color: '#2f616d' }}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                Selected time: <span className="font-medium">{selectedTime}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="text-center py-4 sm:py-6"
                                    style={{ color: '#f04b41' }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25
                                        }
                                    }}
                                >
                                    <motion.p
                                        className="font-medium text-sm sm:text-base"
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        This date is completely booked.
                                    </motion.p>
                                    <motion.p
                                        className="mt-1 sm:mt-2 text-xs sm:text-sm"
                                        style={{ color: '#2f616d' }}
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        Please select another date to continue.
                                    </motion.p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Navigation button */}
            <motion.button
                onClick={handleGoToPage2}
                className="px-4 sm:px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 text-white text-sm sm:text-base"
                style={{
                    backgroundColor: selectedDate && selectedTime ? '#f04b41' : '#f04b41aa',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    cursor: !selectedDate || !selectedTime ? 'not-allowed' : 'pointer'
                }}
                disabled={!selectedDate || !selectedTime}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        delay: 0.4
                    }
                }}
                whileHover={(!selectedDate || !selectedTime) ? {} : buttonVariants.hover}
                whileTap={(!selectedDate || !selectedTime) ? {} : buttonVariants.tap}
            >
                Continue
            </motion.button>

            {/* Helpful message */}
            <AnimatePresence>
                {(!selectedDate || (!selectedTime && dateHasTimeSlots)) && (
                    <motion.p
                        className="text-xs sm:text-sm text-white mt-2 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {!selectedDate
                            ? "Please select a date to continue"
                            : "Please select a time slot to continue"}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Page1;