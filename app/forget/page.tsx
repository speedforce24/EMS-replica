'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from "../../public/img/logo2.png";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Forget() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isFormValid = () => {
    return formData.email;
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
      const response = await fetch(`https://t-ems-staging-6b1c9bd1c4a6.herokuapp.com/user/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Check your email for reset link', {
          onClose: () => setTimeout(() => {
            router.push('/signin');
          }, 3000)
        });
        setFormData({
          email: '',
        });
      } else {
        toast.error('Password Reset Failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="grid grid-cols-2 min-h-screen">
      {/* Form Container */}
      <div className="bg-customGreen relative h-full w-[678px] p-6 backdrop-blur-md text-black">
        <Image src={Logo} alt="Logo" className='h-[38px] w-[98px]' />
        <form className='relative mt-[11%] mb-[40%] lg:ml-28 ml-8' onSubmit={handleSubmit}>
          <div className='w-[360px] h-[198px] gap-8'>
            <h2 className="text-white text-3xl mb-4 font-bold font-sans">Forgot Password</h2>
            <p className='text-white text-md font-light'>Don't worry! It happens. Please enter the email address linked with your account.</p>
          </div>
          <div className="gap-[30px] w-[360px] h-[120px] relative">
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                className="block w-[360px] bg-white border border-gray-600 text-black text-lg font-semibold px-4 pt-[24px] pb-[8px] rounded-2xl appearance-none focus:outline-none focus:ring-0"
              />
              <label
                htmlFor="email"
                className={`absolute left-4 transition-all duration-300 bottom-[-2px] text-gray-600 cursor-text ${focusedField === 'email' || formData.email ? 'top-[4%] text-lg' : 'top-[13px] text-lg'}`}
                onClick={() => document.getElementById('email')?.focus()}
              >
                Email<span className="text-red-600">*</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className={`block px-[72px] py-[12px] w-[360px] rounded-xl text-center text-white ${isFormValid() ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Reset Password
          </button>
          <p className='px-[40px] py-[12px] w-[360px] h-[56px] text-white'>Remember Password? <Link href="/signin" legacyBehavior><a className='text-blue-500'>Login Here</a></Link></p>
        </form>
      </div>

      {/* Background Image */}
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
      <ToastContainer /> {/* Ensure ToastContainer is outside the form */}
    </div>
  );
}
