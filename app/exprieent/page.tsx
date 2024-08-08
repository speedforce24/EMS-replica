'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from "../../public/img/logo2.png";

export default function Forget() {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [focused, setFocused] = useState(false);

  const isFormValid = () => {
    return formData.email.trim() !== ''; // Validate if email is not empty
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    if (!formData.email) {
      setFocused(false);
    }
  };

  return (
    <div className="min-h-screen h-full bg-cover bg-center" style={{ backgroundImage: 'url(/img/bg2.png)', position: 'relative' }}>
      <div className="relative top-0 left-0 w-[50%] bg-customBlack p-6 backdrop-blur-md" style={{ zIndex: 10 }}>
        <Image src={Logo} alt="Logo" />
        <form className='relative mt-[20%] mb-[40%] ml-28'>
          <div className='w-[360px] h-[198px] gap-8'>
            <h2 className="text-white text-3xl mb-4 font-bold font-sans">Forgot Password</h2>
            <p className='text-white text-md font-light'>Don't worry! It happens. Please enter the email address linked with your account.</p>
          </div>
          <div className="w-[360px] h-[200px] relative">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={`block w-full bg-white border border-gray-600 text-black text-lg font-semibold px-4 pt-[24px] pb-[8px] rounded-2xl appearance-none focus:outline-none focus:ring-0 ${focused || formData.email ? 'focused' : ''}`}
            />
            <label
              htmlFor="email"
              className={`absolute left-4 top-[2px] text-gray-600 text-lg cursor-text transition-all duration-300 ${focused || formData.email ? 'top-[10%] ' : 'top-4 text-base'}`}
              onClick={() => document.getElementById('email')?.focus()}
            >
              Email<span className="text-red-600">*</span>
            </label>
          </div>
          <Link href="/signin" legacyBehavior>
            <a className={`block py-[12px] w-[360px] h-[56px] rounded-xl text-center text-white ${isFormValid() ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}>
              Retrieve Password
            </a>
          </Link>
          <p className='px-[40px] py-[12px] ml-[] w-[360px] h-[56px] text-white'>Remember Password? <Link href="/signin" legacyBehavior><a className='text-blue-500'>Login Here</a></Link></p>
        </form>
      </div>
    </div>
  );
}
 
