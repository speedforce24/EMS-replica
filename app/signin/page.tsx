'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { stringify } from 'querystring';

export default function Signin() {
  const router = useRouter(); // Move the useRouter hook inside the component function
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isFormValid = () => {
    return formData.email && formData.password;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
        'https://t-ems-staging-6b1c9bd1c4a6.herokuapp.com/user/sign-in',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 201) {
        
        const userData = response.data.data; // This is the data object you want to store

        // Store the entire data object in local storage
        localStorage.setItem('userData', JSON.stringify(userData));
        toast.success('User Login successfully! Redirecting...', {
          onClose: () => setTimeout(() => {
            router.push('/admin');
          }, 3000),
        });
        setFormData({
          email: '',
          password: '',
        });
        // Store the first name in localStorage
        
      } else {
        toast.error('Failed to register user.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };
  return (
    <div className="grid grid-cols-2 ">
      {/* Form Container */}
      <div className="bg-customGreen relative h-[800px] w-[678px] p-6  text-black ">
        <Image src="/img/logo2.png" alt="Logo" width={100} height={100} />
        <form className='mt-[11%] mb-[20%] lg:ml-28 ml-8' onSubmit={handleSubmit}>
          <div className="w-[360px] h-[180px] gap-8">
            <h2 className="text-white text-2xl mb-4">Sign In</h2>
            <div className="text-white mt-2">
              Don't have an account? <Link href="/" legacyBehavior><a className="text-blue-500">Register Here</a></Link>
            </div>
            <div className="flex space-x-[8px] mt-4">
              <button type="button" className="w-[168px] h-[56px] rounded-xl border border-gray-600">
                <Image src="/img/icons8-facebook-48.png" alt="Facebook" className="ml-16" width={50} height={50} />
              </button>
              <button type="button" className="w-[168px] h-[56px] rounded-xl border border-gray-600">
                <Image src="/img/icons8-google-60.png" alt="Google" className="ml-16 " width={50} height={50} />
              </button>
            </div>
          </div>
          <div className="gap-[30px] w-[360px] h-[230px] relative">
            <div className="relative">
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
                className={`absolute left-4 transition-all duration-300 bottom-[-2px] text-gray-600 cursor-text ${focusedField === 'email' || formData.email ? 'top-[4%] text-lg' : 'top-[13px] text-lg'}`}
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
                className={`absolute left-4 transition-all duration-300 bottom-[-2px] text-gray-600 cursor-text ${focusedField === 'password' || formData.password ? 'top-[4%] text-lg' : 'top-[13px] text-lg'}`}
                onClick={() => document.getElementById('password')?.focus()}
              >
                Password<span className="text-red-600">*</span>
              </label>
            </div>
            <Link href="/forget" legacyBehavior><a className="text-blue-500 ml-56">Forgot Password?</a></Link>
          </div>
          <button
            type="submit"
            className={`block px-[72px] py-[12px] w-[360px] rounded-xl text-center text-white ${isFormValid() ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Sign In
          </button>
        </form>
      </div>

      {/* Background Image */}
      <div>
        <Image
          src="/img/bg3.jpeg"
          alt="Background Image"
          width={777}
          height={1024}
          className="object-contain"
        />
      </div>
      <ToastContainer /> {/* Ensure ToastContainer is outside the form */}
    </div>
  );
}
