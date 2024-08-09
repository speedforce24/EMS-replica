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
  const [formData, setFormData] = useState({
    institutionName: '',
    lastName: '',
    phone: '',
  
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isFormValid = () => {
    return formData.institutionName && formData.lastName && formData.phone ;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleBlur = (field: string) => {
    if (!formData[field as keyof typeof formData]) {
      setFocusedField(null);
    }
  };

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
            <h2 className="text-sm font-semibold">Welcome, {firstName || 'Guest'}!</h2>
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
                    <a className="block py-[12px] w-[100px] mt-5 h-[56px] rounded-2xl text-center text-white bg-customAqua">
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
          <div className="relative bg-customWhite4 p-6 rounded-xl shadow-lg w-[768px] h-[488px]">
          <h2 className="text-2xl font-bold mb-4 text-customBlack">Create Institution</h2>
            <div className="w-[704px] h-[368px] rounded-2xl bg-customWhite3 pb-[20px] pt-[16px] pl-[20px] p-[16px] mt-[30px] ml-[11px]">
            <button 
              onClick={handleCloseForm}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              <FaTimes size={30} />
            </button>
            
            <form className="grid grid-cols-2 gap-3">
              
            <div className="relative">
              <input
                type="text"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
                onFocus={() => handleFocus('institutionName')}
                onBlur={() => handleBlur('institutionName')}
                className=" w-[324px] bg-customGrey border border-customGrey2 text-black text-lg font-semibold px-4 pt-[24px] pb-[2px] rounded-xl appearance-none focus:outline-none focus:ring-0"
              />
              <label
                htmlFor="institutionName"
                className={`absolute left-4 transition-all duration-300  bottom-[-2px]  text-customGrey3 font-sans text-base font-medium  px-1 cursor-text ${focusedField === 'institutionName' || formData.institutionName ? 'top-[4%] text-sm' : 'top-[13px] text-lg'}`}                
                onClick={() => document.getElementById('firstName')?.focus()}
              >
                Institution Name<span className="text-customOrange">*</span>
              </label>
            </div>

            <div className="relative mt-[0px]">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onFocus={() => handleFocus('lastName')}
                onBlur={() => handleBlur('lastName')}
                className="block w-[324px] bg-customGrey border border-customGrey2 text-black text-lg font-semibold px-4 pt-[24px] pb-[4px] rounded-xl appearance-none focus:outline-none focus:ring-0"
              />
              <label
                htmlFor="lastName"
                className={`absolute left-4 transition-all duration-300 bottom-[-2px] text-customGrey3 font-sans text-base font-medium cursor-text ${focusedField === 'lastName' || formData.lastName ? 'top-[4%] text-sm' : 'top-[13px] text-lg'}`}
                onClick={() => document.getElementById('lastName')?.focus()}
              >
                Location<span className="text-customOrange">*</span>
              </label>
            </div>

            <div className="relative mt-[10px]">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => handleFocus('phone')}
                onBlur={() => handleBlur('phone')}
                className="block w-[324px] bg-customGrey border border-customGrey2 text-black text-lg font-semibold px-4 pt-[21px] pb-[4px] rounded-xl appearance-none focus:outline-none focus:ring-0"
              />
              <label
                htmlFor="phone"
                className={`absolute left-4 transition-all duration-300 bottom-[-2px]  text-customGrey3 font-sans text-base font-medium  cursor-text ${focusedField === 'phone' || formData.phone ? 'top-[4%] text-sm' : 'top-[13px] text-lg'}`}
                onClick={() => document.getElementById('phone')?.focus()}
              >
                Phone<span className="text-customOrange">*</span>
              </label>
            </div>
              
                
            </form>
            <div className="flex justify-center mt-[140px]  gap-4">
               
            <button
              type="submit"
              className={`w-[360px] h-[48px] rounded-xl text-lg font-semibold ${isFormValid() ? 'bg-customAqua text-white' : 'bg-gray-300 text-white cursor-not-allowed'}`}
              disabled={!isFormValid()}
            >
              Create
            </button>
                </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
