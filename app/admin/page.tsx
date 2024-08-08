'use client';
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch, FaBell, FaRegComment, FaChevronRight, FaChevronDown, FaChevronUp,FaTimes } from 'react-icons/fa'; // Import icons
import axios from "axios";

export default function AdminPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the userData object from local storage
    const storedData = localStorage.getItem('userData');

    if (storedData) {
      try {
        const userData = JSON.parse(storedData);
        setFirstName(userData.firstName); // Extract and set the firstName
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleStartClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="flex relative bg-customBlack3">
      <aside className="w-[210px] h-[1130.84px] bg-customBlack3 text-white rounded-br-[12px]">
        {/* Sidebar Content */}
        <Image src="/img/logo2.png" alt="Logo" width={100} height={100} className="ml-[50px] mt-[30px]" />
        <div className="flex w-[248px] h-[51.23px] gap-[7.02px] bg-customBlack2 ml-2 pr-9 rounded-xl pt-2 mt-6">
          <Image
            src="/img/profile.png"
            alt="Profile Picture"
            width={20}
            height={20}
            className="ml-4 w-[40px] h-[37px] rounded-md"
          />
          <div>
            <h2 className="text-sm font-semibold">Welcome, {firstName || ''}!</h2>
            <p className="text-sm font-extralight text-customYellow">Superadmin</p>
          </div>
        </div>
        <nav>
          <ul className="space-y-4">
            {/* Add your navigation items here */}
          </ul>
        </nav>
      </aside>
      <main className="">
        {/* Rectangle */}
        <div className="relative top-[6px] left-[50px] w-[1085px] h-[1110px] bg-customWhite2 opacity-100 rounded-xl">
          {/* Main Content */}
          <div className="absolute left-0 w-[1085px] h-[200px] bg-customYellow rounded-tr-xl rounded-tl-xl opacity-100">
            <nav className="flex justify-between mt-4">
              <div className="flex gap-4">
                <Image 
                  src="/img/school.png" 
                  alt="School Logo"
                  width={60}
                  height={40}
                  className="rounded-lg ml-2"
                />
                <h3 className="text-2xl font-bold relative block">
                  ADETOLA'S INTERNATIONAL  
                  <p className="cursor-pointer arrow" onClick={toggleDropdown}>
                    {isDropdownOpen ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
                  </p>
                </h3>
              </div>
              <div className="flex gap-4 mr-6">
                <FaSearch className="text-gray-700 hover:text-gray-900 cursor-pointer" size={24} />
                <FaBell className="text-gray-700 hover:text-gray-900 cursor-pointer" size={24} />
                <FaRegComment className="text-gray-700 hover:text-gray-900 cursor-pointer" size={24} />
              </div>
            </nav>
          </div>
          <div className="absolute top-[100px] left-[30px] w-[1050px] h-[960px] mb-[300px] bg-customWhite3 rounded-2xl opacity-100">
            <h3 className="text-[30px] text-center font-bold font-plus-jakarta-sans mt-[40px] mb-[20px]">Welcome To Teesas EMS Platform. Let's get you started</h3>
            <div className="grid grid-cols-2 gap-7">
              <div className="top-[90px] left-[40px] w-[500px] h-[480px] mt-[5px] ml-[20px] bg-customWhite2 rounded-2xl opacity-100"> 
                <Image 
                  src="/img/module1.png" 
                  alt="School Logo"
                  width={429}
                  height={50}
                  className="rounded-2xl mt-8 ml-[35px] object-fit w-[429px] h-[249px]"
                />
                <div className="ml-[35px] mt-[15px]">
                  <h1 className="text-base text-gray-400 mb-3">Step 1</h1>
                  <p className="block text-lg font-extrabold text-customBlack">Add Institution</p>
                  <p>Here is a brief detail about what it means to add institution</p>
                  <button 
                    onClick={handleStartClick}
                    className="block py-[12px] w-[100px] mt-4 h-[56px] rounded-2xl text-center text-white bg-customAqua"
                  >
                    Start
                  </button>
                </div>
              </div>
              <div className="top-[90px] w-[500px] h-[480px] mt-[5px] bg-customWhite2 rounded-2xl opacity-100"> 
                <Image 
                  src="/img/module 2.png" 
                  alt="School Logo"
                  width={429}
                  height={50}
                  className="rounded-2xl mt-8 ml-[39px] object-fit h-[249px] w-[429px]"
                />
                <div className="ml-[35px] mt-[15px]">
                  <h1 className="text-base text-gray-400 mb-3">Step 2</h1>
                  <p className="block text-lg font-extrabold text-customBlack">Make Subscription</p>
                  <p>Here is a brief detail about what it means to add institution</p>
                  <Link href="/signin" legacyBehavior>
                    <a className="block py-[12px] w-[100px] mt-4 h-[56px] rounded-2xl text-center text-white bg-customAqua">
                      Start
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative left-[20px] w-[1020px] mt-10 h-[300px] bg-customWhite2 rounded-2xl opacity-100">
              <div className="absolute ml-[35px] mt-[30px]">
                <h1 className="text-2xl font-extrabold text-black mb-3">Claim your discount now as a first time User</h1>
                <p className="text-sm font-normal text-customBlack max-w-[450px]">
                  Here is a brief detail about the discount that is being offered and what it means to be enrolled under the Teesas EMS platform
                </p>                
                <Link href="/signin" legacyBehavior>
                  <a className="block py-[12px] w-[200px] mt-4 h-[56px] rounded-2xl text-center text-white bg-customAqua">
                    Subscribe now
                  </a>
                </Link>
              </div>
              <div className="absolute top-[24px] left-[750px] w-[226px] h-[226px] bg-customPeach rounded-full opacity-100 flex items-center justify-center">
                <div className="absolute w-[211px] h-[124px] bg-red-500 p-[22px_13px] flex items-center justify-center rounded-xl opacity-100" style={{ left: '-50px' }}>
                  <span className="text-white font-extrabold text-[49px] font-plus-jakarta-sans">-20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-customWhite p-6 rounded-lg shadow-lg w-[768px]">
            <button 
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Add Institution</h2>
            <form className="b">
              <div className="mb-4">
                <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700">Institution Name</label>
                <input 
                  type="text" 
                  id="institutionName" 
                  name="institutionName" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
                />
              </div>
              <div className="flex justify-end gap-4">
               
                <button 
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded-md"
                  >
                    Save
                  </button>
                </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
