import React from 'react';
import Eco from '../assets/Eco.jpeg'; // Import images
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg';
import img9 from '../assets/img9.jpeg';
import img5 from '../assets/img5.jpeg';
import img6 from '../assets/img6.jpeg';
import img7 from '../assets/img7.jpeg';
import img8 from '../assets/img8.jpeg';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-green-50">
            {/* Navigation Bar */}
            <nav className="bg-green-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">TireCycle</h1>
                    <div className="space-x-4">
                        <a href="/login" className="text-white hover:text-green-200">Login</a>
                        <a href="/register" className="text-white hover:text-green-200">Register</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Tire Image */}
            <section className="relative bg-green-700 text-white py-32">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-50"
                    style={{ backgroundImage: `url(${img6})` }} // Use imported variable
                ></div>
                <div className="container mx-auto text-center relative z-10">
                    <h2 className="text-5xl font-bold mb-4">Revolutionizing Tire Recycling</h2>
                    <p className="text-xl mb-8">
                        Join us in creating a sustainable future by recycling tires responsibly.
                    </p>
                    <a
                        href="/register"
                        className="bg-white text-green-800 px-8 py-3 rounded-full font-semibold hover:bg-green-100 transition duration-300"
                    >
                        Get Started
                    </a>
                </div>
            </section>

            {/* Features Section with Tire Images */}
            <section className="py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-green-900 mb-8">Why Choose TireCycle?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src={Eco} // Use imported variable
                                alt="Eco-Friendly"
                                className="w-full h-48 object-cover rounded-t-lg mb-4"
                            />
                            <h3 className="text-2xl font-semibold text-green-800 mb-4">Eco-Friendly</h3>
                            <p className="text-gray-600">
                                We ensure that every tire is recycled in an environmentally friendly way.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src={img2} // Use imported variable
                                alt="Easy to Use"
                                className="w-full h-48 object-cover rounded-t-lg mb-4"
                            />
                            <h3 className="text-2xl font-semibold text-green-800 mb-4">Easy to Use</h3>
                            <p className="text-gray-600">
                                Our platform is simple and intuitive for both buyers and sellers.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src={img3} // Use imported variable
                                alt="Community Impact"
                                className="w-full h-48 object-cover rounded-t-lg mb-4"
                            />
                            <h3 className="text-2xl font-semibold text-green-800 mb-4">Community Impact</h3>
                            <p className="text-gray-600">
                                Join a community dedicated to reducing waste and promoting sustainability.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-green-100 py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-green-900 mb-8">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src={img2} // Use imported variable
                                alt="Register"
                                className="w-full h-48 object-cover rounded-t-lg mb-4"
                            />
                            <h3 className="text-2xl font-semibold text-green-800 mb-4">1. Register</h3>
                            <p className="text-gray-600">
                                Create an account as a buyer, seller, or recycler.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src={img6} // Use imported variable
                                alt="List or Buy Tires"
                                className="w-full h-48 object-cover rounded-t-lg mb-4"
                            />
                            <h3 className="text-2xl font-semibold text-green-800 mb-4">2. List or Buy Tires</h3>
                            <p className="text-gray-600">
                                Sellers can list tires, and buyers can purchase them for recycling.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src={img5} // Use imported variable
                                alt="Recycle Responsibly"
                                className="w-full h-48 object-cover rounded-t-lg mb-4"
                            />
                            <h3 className="text-2xl font-semibold text-green-800 mb-4">3. Recycle Responsibly</h3>
                            <p className="text-gray-600">
                                Tires are recycled in an eco-friendly manner, reducing environmental impact.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-green-900 mb-8">Recycling Tires Responsibly</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <img
                            src={img8} // Use imported variable
                            alt="Tire Recycling"
                            className="w-full h-64 object-cover rounded-lg"
                        />
                        <img
                            src={img7} // Use imported variable
                            alt="Tire Recycling"
                            className="w-full h-64 object-cover rounded-lg"
                        />
                        <img
                            src={img9} // Use imported variable
                            alt="Tire Recycling"
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-green-700 text-white py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
                    <p className="text-xl mb-8">
                        Join TireCycle today and contribute to a greener planet.
                    </p>
                    <a
                        href="/register"
                        className="bg-white text-green-800 px-8 py-3 rounded-full font-semibold hover:bg-green-100 transition duration-300"
                    >
                        Sign Up Now
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-green-900 text-white py-8">
                <div className="container mx-auto text-center">
                    <p>&copy; 2025 TireCycle. All rights reserved.</p>
                    <p className="mt-2">
                        Contact us: <a href="mailto:info@tirecycle.com" className="underline">info@tirecycle.com</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;