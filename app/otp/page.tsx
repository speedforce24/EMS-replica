'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from "../../public/img/logo2.png";
import PinInput from 'react-pin-input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Import axios

export default function Otp() {
  const [inputCompleted, setInputCompleted] = useState(false);
  const [pin, setPin] = useState<string>(''); // Explicitly specify the pin as a string
  const [timeLeft, setTimeLeft] = useState(60); // Countdown timer in seconds (5 minutes = 300 seconds)
  const [resendAvailable, setResendAvailable] = useState(false); // Resend button state
  const router = useRouter();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendAvailable(true);
    }
  }, [timeLeft]);

  const handleInputChange = (value: string, index: number) => { // Explicitly type value as string and index as number
    setPin(value); // Store the current input value
    setInputCompleted(false); // Reset input completion state on change
  };

  const handleInputComplete = (value: string, index: number) => { // Explicitly type value as string and index as number
    setInputCompleted(true); // Enable the button when input is complete
    setPin(value); // Store the final input value
  };

  const handleSubmit = async () => {
    // Handle submission logic here, e.g., verify OTP
    console.log('Submitting OTP:', pin);
    if (isFormValid()) {
      try {
        const response = await axios.post('https://t-ems-staging-6b1c9bd1c4a6.herokuapp.com/user/activate', { otp: pin });

        if (response.status === 201) {
          toast.success('OTP verified successfully!', { autoClose: 3000 });
          // Navigate to the specified path after OTP verification
          router.push('/admin'); // Replace '/specified-path' with your desired path
        } else {
          toast.error('Failed to verify OTP.', { autoClose: 3000 });
        }
      } catch (error) {
        toast.error('Error.', { autoClose: 3000 });
      }
    } else {
      console.log('Form is not valid. Please fill out all fields.');
    }
  };

  const isFormValid = () => {
    return pin.length === 4; // Example validation condition
  };

  const handleResendOtp = async () => {
    setTimeLeft(60); // Reset the timer to 5 minutes (300 seconds)
    setResendAvailable(false); // Disable resend button
    try {
      const response = await axios.post('https://t-ems-staging-6b1c9bd1c4a6.herokuapp.com/user/otp/resend');

      if (response.status === 201) {
        toast.success('OTP resent successfully!', { autoClose: 3000 });
      } else {
        toast.error('Failed to resend OTP.', { autoClose: 3000 });
      }
    } catch (error) {
      toast.error('Error.', { autoClose: 3000 });
    }
  };

  const buttonClasses = `inline-block text-center bg-blue-500 mt-20 hover:bg-blue-700 text-white font-bold py-[12px] w-[320px] h-[56px] rounded-xl ${inputCompleted && isFormValid() ? 'opacity-100 cursor-pointer' : 'opacity-50 pointer-events-none'}`;

  // Function to format the timeLeft as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className='grid grid-cols-2' >
      <div className="bg-customGreen relative h-[800px] w-[678px] p-6 backdrop-blur-md text-black ">       
        <div className='relative mt-[23%] mb-[40%] lg:ml-28 ml-8'>
          <div className='w-[360px] h-[198px] gap-8'>
            <h2 className="text-white text-3xl mb-4 font-bold font-sans">OTP Verification</h2>
            <p className='text-white text-md font-light'>Enter the verification code we just sent on your email address.</p>
          </div>
          <div className="gap-[10px] w-[360px] h-[200px]">
            <PinInput
              length={4}
              initialValue=""
              onChange={handleInputChange}
              onComplete={handleInputComplete}
              type="numeric"
              inputMode="number"
              inputStyle={{
                width: '75px',
                height: '75px',
                fontSize: '24px',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '0.75rem',
                textAlign: 'center'
              }}
              inputFocusStyle={{ borderColor: 'rgba(229, 165, 0, 1)' }}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            />
            <div className="mt-4">
              {resendAvailable ? (
                <button
                  className="text-orange-500 hover:text-orange-600 font-bold"
                  onClick={handleResendOtp}
                >
                  RESEND OTP
                </button>
              ) : (
                <p className="text-customWhite text-sm">
                  <span className="text-orange-500">{formatTime(timeLeft)}</span> before you can request another OTP
                </p>
              )}
            </div>
            <button
              className={buttonClasses}
              onClick={handleSubmit}
              disabled={!inputCompleted || !isFormValid()}
            >
              Verify OTP
            </button>
          </div>
        </div>
      </div>
      <div>
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
