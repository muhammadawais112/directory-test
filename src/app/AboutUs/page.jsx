"use client"
import React from "react";
import banner from '../../assets/Blogs/main.png'
import BusinessesByCities from "../Home/HomeComponents/BusinessesByCities";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import NeedHelp from "../../components/NeedHelp/NeedHelp";

const AboutUs = () => {
    return (
        <div className="">
            <div className="text-center mb-16">
                <img src={banner} alt="banner" className='!w-full object-cover h-[700px]' />
            </div>


            <div className="max-w-4xl mx-auto py-16">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h1 className="text-4xl font-bold mb-4">We're On A Mission To Change How You Do Marketing</h1>
                    </div>

                    <div className="md:w-1/2 md:pl-8">
                        <p className="text-gray-600 mb-8">Maecenas quis viverra metus, et efficitur ligula. Nam congue, augue vel congue, sed luctus lacus congue, integer convallis condimentum. Duis elementum tortor eget condimentum tempor. Praesent sollicitudin lacus ut placerat pulvinar.</p>
                        <div className="flex flex-col md:flex-row">
                            <div className="flex items-center mb-8 md:mb-0 md:mr-8">
                                <i className="fas fa-shield-alt text-4xl text-gray-400 mr-4"></i>
                                <div>
                                    <h3 className="text-xl font-semibold">Trust</h3>
                                    <p className="text-gray-600">Nullam vehicula liberet nullam maximus.</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-lock text-4xl text-gray-400 mr-4"></i>
                                <div>
                                    <h3 className="text-xl font-semibold">Secure Payment</h3>
                                    <p className="text-gray-600">Nullam vehicula liberet nullam maximus.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="text-center mb-16">
                <img src={banner} alt="banner" className='max-w-4xl mx-auto' />
            </div>
            <div className="text-center mb-16">
                <div className="flex flex-col md:flex-row justify-between max-w-[740px] mx-auto mt-[60px] space-y-4 md:space-y-0">
                    <div className="text-center">
                        <h3 className="text-[42px] font-semibold">4M</h3>
                        <p className="text-sm">Awward Winning</p>
                    </div>

                    <div className="text-center">
                        <h3 className="text-[42px] font-semibold">12K</h3>
                        <p className="text-sm">Listings</p>
                    </div>

                    <div className="text-center">
                        <h3 className="text-[42px] font-semibold">20M</h3>
                        <p className="text-sm">Happy Customer</p>
                    </div>
                </div>
            </div>


            <div className="text-center max-w-[1180px] mx-auto mb-16">
                <BusinessesByCities />
            </div>


            <div className="bg-white rounded-lg max-w-4xl py-16 mx-auto w-full flex flex-col md:flex-row overflow-hidden">
                <div className="bg-pink-50 p-8 md:w-1/2 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-6">
                        Let's Find The Right Selling Option For You
                    </h1>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <i className="fas fa-home text-pink-500 text-2xl mr-4"></i>
                            <div>
                                <h2 className="font-semibold text-lg">Property Management</h2>
                                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <i className="fas fa-key text-pink-500 text-2xl mr-4"></i>
                            <div>
                                <h2 className="font-semibold text-lg">Mortgage Services</h2>
                                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <i className="fas fa-dollar-sign text-pink-500 text-2xl mr-4"></i>
                            <div>
                                <h2 className="font-semibold text-lg">Currency Services</h2>
                                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div>
                    <button className="mt-8 bg-black text-white px-6 py-3 rounded-full flex items-center">
                        Learn More
                        <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
                <div className="bg-gray-200 flex items-center justify-center md:w-1/2 p-8">
                    <img alt="Abstract geometric shapes with a circle and triangle" className="w-3/4" src="https://placehold.co/300x300" />
                </div>
            </div>

            <div className="flex flex-col items-center mx-auto">
                <p className="text-sm text-gray-500 mb-4">Trusted by the world's best</p>
                <div className="flex justify-center space-x-8 mb-12">
                    <img
                        src="https://storage.googleapis.com/a1aa/image/bTqvUxgqAP9TtHhZj3s9CztprfjzOqc17pxChxnF3VY.jpg"
                        alt="Amazon logo"
                        className="h-8"
                    />
                    <img
                        src="https://storage.googleapis.com/a1aa/image/L2AXOz5QR59-pPd8WNEUxoaGT6gsYHUK9H5G4UxxQ8I.jpg"
                        alt="AMD logo"
                        className="h-8"
                    />
                    <img
                        src="https://storage.googleapis.com/a1aa/image/5fWbPBGDQq_erGnh3q4_BKXhGPXrA1GHIZAO763kpmE.jpg"
                        alt="Cisco logo"
                        className="h-8"
                    />
                    <img
                        src="https://storage.googleapis.com/a1aa/image/abO8VBn3vWKWP4HPN4l_yrW0w46ofUWbK7g4UCU3biU.jpg"
                        alt="Dropcam logo"
                        className="h-8"
                    />
                    <img
                        src="https://storage.googleapis.com/a1aa/image/9tgdnQFPIjH9MZzDCyJkfsDlVCwjoiWi6zYNcKJ8EJE.jpg"
                        alt="Logitech logo"
                        className="h-8"
                    />
                    <img
                        src="https://storage.googleapis.com/a1aa/image/05QBLffnNRkBMSgkMdL5e8fjg49F-iFpZksIRs-C5Zg.jpg"
                        alt="Spotify logo"
                        className="h-8"
                    />
                </div>
            </div>

      <NeedHelp/>

        </div>
    );
};

export default AboutUs;
