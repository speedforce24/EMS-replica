'use client';
import Image from "next/image";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isFormValid = () => {
    return formData.firstName && formData.lastName && formData.phone && formData.email && formData.password && formData.confirmPassword;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post(
        'https://t-ems-staging-6b1c9bd1c4a6.herokuapp.com/user/sign-up',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        toast.success('User Login successfully! Redirecting...', {
          onClose: () => setTimeout(() => {
            router.push('/otp');
          }, 3000)
        });
        setFormData({
          firstName:'',
          lastName:'',
          email: '',
          phone:'',
          password: '',
          confirmPassword:''

        });
      } else {
        toast.error('Failed to register user.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };
  return (
    <div className='grid grid-cols-2' >
      <div className="bg-customGreen relative h-[800px] w-[678px] p-6 backdrop-blur-md text-black ">    
        <Image src="/img/logo2.png" alt="Logo" width={100} height={100} />
        <form className=' mt-[11%] mb-[300px]  lg:ml-28 ml-8' onSubmit={handleSubmit}>
          <div className='w-[360px] h-[150px] gap-8'>
            <h2 className="text-white text-4xl mb-4 font-bold ">Sign Up</h2>
            <div className="text-white mt-2">Already have an account? <Link href="/signin" legacyBehavior><a className="text-blue-500">Login Now</a></Link></div>
            <div className="flex space-x-[8px] mt-4">
              <button type="button" className="w-[168px] h-[56px] rounded-xl border border-gray-600">
                <Image src="/img/icons8-facebook-48.png" alt="Facebook" className="ml-16" width={50} height={50} />
              </button>
              <button type="button" className="w-[168px] h-[56px] rounded-xl border border-gray-600">
                <Image src="/img/icons8-google-60.png" alt="Google" className="ml-16" width={50} height={50} />
              </button>
            </div>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-[12px] text-white whitespace-nowrap">or Register with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </div>

          <div className="gap-[36px] w-[360px] h-[200px] mt-4">
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onFocus={() => handleFocus('firstName')}
                onBlur={() => handleBlur('firstName')}
                className=" w-[360px] bg-white border border-gray-600 text-black text-lg font-semibold px-4 pt-[24px] pb-[2px] rounded-xl appearance-none focus:outline-none focus:ring-0"
              />
              <label
                htmlFor="firstName"
                className={`absolute left-4 transition-all duration-300  bottom-[-2px] text-gray-600 px-1 cursor-text ${focusedField === 'firstName' || formData.firstName ? 'top-[4%] text-lg' : 'top-[13px] text-lg'}`}                
                onClick={() => document.getElementById('firstName')?.focus()}
              >
                First Name<span className="text-red-600">*</span>
              </label>
            </div>

            <div className="relative mt-[10px]">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onFocus={() => handleFocus('lastName')}
                onBlur={() => handleBlur('lastName')}
                className="block w-[360px] bg-white border border-gray-600 text-black text-lg font-semibold px-4 pt-[21px] pb-[4px] rounded-xl appearance-none focus:outline-none focus:ring-0"
              />
              <label
                htmlFor="lastName"
                className={`absolute left-4 transition-all duration-300 bottom-[-2px] text-gray-600   cursor-text ${focusedField === 'lastName' || formData.lastName ? 'top-[4%] text-lg' : 'top-[13px] text-lg'}`}
                onClick={() => document.getElementById('lastName')?.focus()}
              >
                Last Name<span className="text-red-600">*</span>
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
                className="block w-[360px] bg-white border border-gray-600 text-black text-lg font-semibold px-4 pt-[21px] pb-[4px] rounded-xl appearance-none focus:outline-none focus:ring-0"
              />
              <label
                htmlFor="phone"
                className={`absolute left-4 transition-all duration-300 bottom-[-2px] text-gray-600   cursor-text ${focusedField === 'phone' || formData.phone ? 'top-[4%] text-lg' : 'top-[13px] text-lg'}`}
                onClick={() => document.getElementById('phone')?.focus()}
              >
                Phone<span className="text-red-600">*</span>
              </label>
            </div>
          </div>

          <div className="relative ">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              className="block w-[360px] bg-white border border-gray-600 text-black text-lg font-semibold px-4 pt-[21px] pb-[4px] rounded-xl appearance-none focus:outline-none focus:ring-0"
            />
            <label
              htmlFor="email"
              className={`absolute left-4 transition-all duration-300 bottom-[-2px] text-gray-600   cursor-text ${focusedField === 'email' || formData.email ? 'top-[4%] text-lg' : 'top-[13px] text-lg'}`}
              onClick={() => document.getElementById('email')?.focus()}
            >
              Email<span className="text-red-600">*</span>
            </label>
          </div>

          <div className="relative mt-[10px]">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              className="block w-[360px] bg-white border border-gray-600 text-black text-lg font-semibold px-4 pt-[21px] pb-[4px] rounded-xl appearance-none focus:outline-none focus:ring-0"
            />
            <label
              htmlFor="password"
              className={`absolute left-4 transition-all duration-300 bottom-[-2px] text-gray-600   cursor-text ${focusedField === 'password' || formData.password ? 'top-[4%] text-lg' : 'top-[13px] text-lg'}`}
              onClick={() => document.getElementById('password')?.focus()}
            >
              Password<span className="text-red-600">*</span>
            </label>
          </div>

          <div className="relative mt-[10px]">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={() => handleFocus('confirmPassword')}
              onBlur={() => handleBlur('confirmPassword')}
              className="block w-[360px] bg-white border border-gray-600 text-black text-lg font-semibold px-4 pt-[21px] pb-[4px] rounded-xl appearance-none focus:outline-none focus:ring-0"
            />
            <label
              htmlFor="confirmPassword"
              className={`absolute left-4 transition-all duration-300 bottom-[-2px] text-gray-600   cursor-text ${focusedField === 'confirmPassword' || formData.confirmPassword ? 'top-[4%] text-lg' : 'top-[13px] text-lg'}`}
              onClick={() => document.getElementById('confirmPassword')?.focus()}
            >
              Confirm Password<span className="text-red-600">*</span>
            </label>
          </div>

          <div className="flex  mt-6">
            <button
              type="submit"
              className={`w-[360px] h-[48px] rounded-xl text-lg font-semibold ${isFormValid() ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 cursor-not-allowed'}`}
              disabled={!isFormValid()}
            >
              Sign Up
            </button>
          </div>
        </form>
        </div>
        <div
        
        >
           <Image
            src="/img/bg3.jpeg"
            alt="Background Image"
            width={777}
            height={1024}
            className="object-contain"
           
          
          />
          </div>
        <ToastContainer />
     
    </div>
  );
}
