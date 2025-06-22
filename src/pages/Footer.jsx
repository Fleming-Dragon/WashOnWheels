import React from 'react'

const Footer = () => {
    return (
        <footer className="ml-90 w-200 mt-10" style={{ backgroundColor: '#2f616d' }}>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-white">Contact Us</h3>
                        <p className="mb-1 text-white">Email: info@washonwheels.com</p>
                        <p className="mb-1 text-white">Phone: (555) 123-4567</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="text-white hover:text-gray-300">Services</a></li>
                            <li><a href="#" className="text-white hover:text-gray-300">About Us</a></li>
                            <li><a href="#" className="text-white hover:text-gray-300">Contact</a></li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-white">Hours</h3>
                        <p className="mb-1 text-white">Monday - Friday: 8am - 6pm</p>
                        <p className="mb-1 text-white">Saturday: 9am - 5pm</p>
                        <p className="mb-1 text-white">Sunday: Closed</p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t mt-6 pt-6 text-center" style={{ borderColor: '#53abc7' }}>
                    <p className="text-white">&copy; {new Date().getFullYear()} Wash On Wheels. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer