'use client';
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch, FaBell, FaRegComment, FaChevronRight, FaChevronDown, FaChevronUp,FaTimes } from 'react-icons/fa'; // Import icons
import axios from "axios";
import { FiDownload, FiUpload } from "react-icons/fi";
import router from "next/router";

export default function AdminPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<'form1' | 'form2' | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false);
  const[isInstituteActive,setIsInstituteActive]=useState(true)
  const [isUploadActive, setIsUploadActive]=useState(false);
  const [id, setId] = useState<string | null>(null);

  // Separate state variables for each file input
  const [selectedStudentsFileName, setSelectedStudentsFileName] = useState('Upload Students');
  const [selectedTeachersFileName, setSelectedTeachersFileName] = useState('Upload Teachers');
  const [selectedCoursesFileName, setSelectedCoursesFileName] = useState('Upload Courses');

  const [formData, setFormData] = useState({
    
    location: '',
    email: '',
    institutionName: '',  // Add institutionName to the state
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [selectedStudentsFile, setSelectedStudentsFile] = useState<File | null>(null);
  const [selectedTeachersFile, setSelectedTeachersFile] = useState<File | null>(null);
  const [selectedCoursesFile, setSelectedCoursesFile] = useState<File | null>(null);

  const isFormValid = () => {
    return formData.institutionName && formData.location && formData.email;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleBlur = (field: string) => {
    if (!formData[field as keyof typeof formData]) {
      setFocusedField(null);
    }
  };

  // Handle file change for each input
  const handleStudentsFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedStudentsFile(file || null);
    setSelectedStudentsFileName(file ? file.name : 'Upload Students');
  };

  const handleTeachersFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedTeachersFile(file || null);
    setSelectedTeachersFileName(file ? file.name : 'Upload Teachers');
  };

  const handleCoursesFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedCoursesFile(file || null);
    setSelectedCoursesFileName(file ? file.name : 'Upload Courses');
  };

  const uploadStudentsFile = async (file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('studentsFile', file);

    try {
      const response = await axios.post(
        'https://t-ems-staging-6b1c9bd1c4a6.herokuapp.com/user/upload-users', // Update endpoint accordingly
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        toast.success('Students file uploaded successfully!');
      } else {
        toast.error('Failed to upload students file.');
      }
    } catch (error) {
      console.error('Error uploading students file:', error);
      toast.error('An error occurred while uploading students file.');
    }
  };

  const uploadTeachersFile = async (file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('teachersFile', file);

    try {
      const response = await axios.post(
        "https://t-ems-staging-6b1c9bd1c4a6.herokuapp.com/user/upload-users"
      );
      

      if (response.status === 201) {
        toast.success('Teachers file uploaded successfully!');
      } else {
        toast.error('Failed to upload teachers file.');
      }
    } catch (error) {
      console.error('Error uploading teachers file:', error);
      toast.error('An error occurred while uploading teachers file.');
    }
  };

  // const uploadCoursesFile = async (file: File | null) => {
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append('coursesFile', file);

  //   try {
  //     const response = await axios.post(
  //       'https://t-ems-staging-6b1c9bd1c4a6.herokuapp.com/user/upload-users', // Update endpoint accordingly
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );

  //     if (response.status === 201) {
  //       toast.success('Courses file uploaded successfully!');
  //     } else {
  //       toast.error('Failed to upload courses file.');
  //     }
  //   } catch (error) {
  //     console.error('Error uploading courses file:', error);
  //     toast.error('An error occurred while uploading courses file.');
  //   }
  // };
  const downloadSampleCsv = () => {
    const csvContent = `Name,Email,Grade\nJohn Doe,johndoe@example.com,A\nJane Smith,janesmith@example.com,B`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sample.csv');
    link.click();

    // Show success message after download
    toast.success('Sample CSV file downloaded successfully!');
  };

  const uploadInstitutionDetails = async () => {
    try {
      const response = await axios.post(
        'https://t-ems-staging-6b1c9bd1c4a6.herokuapp.com/institution', // Update endpoint accordingly
        {
          ownerId:id,
          location: formData.location,
          email: formData.email,
          name: formData.institutionName, // Include institutionName in the API request
        }
      );
  
      if (response.status === 201) {
        toast.success('Institution details uploaded successfully!');
      } else {
        toast.error('Failed to upload institution details.');
      }
    } catch (error) {
      console.error('Error uploading institution details:', error);
      toast.error('An error occurred while uploading institution details.');
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast.error('Please fill in all required fields and upload files.');
      return;
    }

    try {
      await uploadInstitutionDetails();

      await Promise.all([
        uploadStudentsFile(selectedStudentsFile),
        uploadTeachersFile(selectedTeachersFile),
        // uploadCoursesFile(selectedCoursesFile),
      ]);

      
      
      setIsSubscriptionActive(true);
      setFormData({
        
        location: '',
        email: '',
        institutionName:'',
      });
      setSelectedStudentsFile(null);
      setSelectedTeachersFile(null);
      // setSelectedCoursesFile(null);

      setIsUploadActive(true);
      setFormData({
        
        location: '',
        email: '',
        institutionName:''
      });


      setIsInstituteActive(false);
      setSelectedStudentsFile(null);
      setSelectedTeachersFile(null);

     


      // Reset the displayed text to the default state
      setSelectedStudentsFileName('Upload Students');
      setSelectedTeachersFileName('Upload Teachers');
      setSelectedCoursesFileName('Upload Courses');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      try {
        const userData = JSON.parse(storedData);
        setFirstName(userData.firstName);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);
  
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    console.log(storedData)
    if (storedData) {
      try {
        const userData = JSON.parse(storedData);
        console.log(userData.id)
        setId(userData.id);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // useEffect(() => {
  //   const storedData = localStorage.getItem('userData');
  //   if (storedData) {
  //     try {
  //       const userData = JSON.parse(storedData);
  //       setId(userData.institutionId, );
  //     } catch (error) {
  //       console.error('Error parsing user data:', error);
  //     }
  //   }
  // }, []);
  // useEffect(() => {
  //   const storedData = localStorage.getItem('userData');
  //   if (storedData) {
  //     try {
  //       const userData = JSON.parse(storedData);
  //       setId(userData.userTypeId,);
  //     } catch (error) {
  //       console.error('Error parsing user data:', error);
  //     }
  //   }
  // }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleStartClick = (form: 'form1' | 'form2') => {
    setSelectedForm(form);
  };

  const handleCloseForm = () => {
    setSelectedForm(null);
  };

  const handleUploadButtonClick = (inputId: string) => {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };
  return (
    <div className="flex relative bg-customBlack3">
      <aside className="  w-[210px] h-[1130.84px] bg-customBlack3 text-white rounded-br-[12px]">
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
        <div className="relative top-[6px] left-full lg:left-[50px] sm:md:lg:w-[1250px] w-full h-full md:sm:lg:h-[1110px] bg-customWhite2 opacity-100 rounded-xl">
          {/* Main Content */}
          <div className="absolute left-0 w-full sm:md:lg:w-[1250px] h-full sm:md:lg:h-[200px] bg-customYellow rounded-tr-xl rounded-tl-xl opacity-100">
            <nav className="flex justify-between mt-4">
              <div className="flex gap-4">
                
                <h3 className="text-2xl font-bold relative block pl-2 ml-2">
                  CREATE INSTITUTION  
                  
                </h3>
              </div>
              <div className="flex gap-4 mr-6">
                <FaSearch className="text-gray-700 hover:text-gray-900 cursor-pointer" size={24} />
                <FaBell className="text-gray-700 hover:text-gray-900 cursor-pointer" size={24} />
                <FaRegComment className="text-gray-700 hover:text-gray-900 cursor-pointer" size={24} />
              </div>
            </nav>
          </div>
          <div>
          <div className="absolute top-[100px] left-[30px] w-full lg:w-[1210px] h-[960px] mb-[300px] bg-customWhite3 rounded-2xl opacity-100">
            <h3 className="text-[30px] text-center font-bold font-plus-jakarta-sans mt-[40px] mb-[20px]">Welcome To Teesas EMS Platform. Let's get you started</h3>
            <div className="grid grid-cols-2 gap-20">
              <div className="top-[90px] left-[40px] w-full lg:w-[550px] h-[480px] mt-[5px] ml-[20px] bg-customWhite2 rounded-2xl opacity-100"> 
                <Image 
                  src="/img/module1.png" 
                  alt="School Logo"
                  width={429}
                  height={50}
                  className="rounded-2xl mt-8 ml-[35px] object-fit w-[475px] h-[249px]"
                />
                <div className="ml-[35px] mt-[15px]">
                  <h1 className="text-base text-gray-400 mb-3">Step 1</h1>
                  <p className="block text-lg font-extrabold text-customBlack">Add Institution</p>
                  <p>Here is a brief detail about what it means to add institution</p>
                  <button 
                    onClick={()=>handleStartClick('form1')}
                    className="block py-[12px] w-[100px] mt-4 h-[56px] rounded-2xl text-center text-white bg-customAqua"
                  >
                    Start
                  </button>
                </div>
              </div>
              <div className={`top-[90px] w-full lg:w-[550px] h-[480px] mt-[5px] bg-customWhite2 rounded-2xl opacity-100  ${isSubscriptionActive ? '' : 'opacity-50 cursor-not-allowed'}`}>                 <Image 
                  src="/img/module 2.png" 
                  alt="School Logo"
                  width={429}
                  height={50}
                  className="rounded-2xl mt-8 ml-[39px] object-fit h-[249px] w-[480px]"
                />
                <div className="ml-[35px] mt-[15px]">
                  <h1 className="text-base text-gray-400 mb-3">Step 2</h1>
                  <p className="block text-lg font-extrabold text-customBlack">Make Subscription</p>
                  <p>Here is a brief detail about what it means to add institution</p>
                  <button 
                    onClick={()=>handleStartClick('form2')}
                    className="block py-[12px] w-[100px] mt-4 h-[56px] rounded-2xl text-center text-white bg-customAqua"
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
            <div className="relative left-[20px] w-full lg:w-[1170px] mt-10 h-[300px] bg-customWhite2 rounded-2xl opacity-100">
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
              <div className="absolute top-[24px] lg:left-[900px] w-[226px] h-[226px] bg-customPeach rounded-full opacity-100 flex items-center justify-center">
                <div className="absolute w-[211px] h-[124px] bg-red-500 p-[22px_13px] flex items-center justify-center rounded-xl opacity-100" style={{ left: '-50px' }}>
                  <span className="text-white font-extrabold text-[49px] font-plus-jakarta-sans">-20%</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </main>
     {selectedForm === 'form1' && (
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
            
            <form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
              
              
            <div className={`relative  ${isInstituteActive ? '' : 'opacity-50 cursor-not-allowed'}`}>
              <input
                type="text"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
                onFocus={() => handleFocus('institutionName')}
                onBlur={() => handleBlur('instituitonName')}
                className=" w-[324px] bg-customGrey border border-customGrey2 text-black text-lg font-semibold px-4 pt-[24px] pb-[2px] rounded-xl appearance-none focus:outline-none focus:ring-0"
              />
              <label
                htmlFor="ownerId"
                className={`absolute left-4 transition-all duration-300  bottom-[-2px]  text-customGrey3 font-sans text-base font-medium  px-1 cursor-text ${focusedField === 'institutionName' || formData.institutionName ? 'top-[4%] text-sm' : 'top-[13px] text-lg'}`}                
                onClick={() => document.getElementById('ownerId')?.focus()}
              >
                
                Institution Name<span className="text-customOrange">*</span>
              </label>
            </div>

            <div className={`relative mt-[0px] ${isInstituteActive ? '' : 'opacity-50 cursor-not-allowed'}`}>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                onFocus={() => handleFocus('location')}
                onBlur={() => handleBlur('location')}
                className="block w-[324px] bg-customGrey border border-customGrey2 text-black text-lg font-semibold px-4 pt-[24px] pb-[4px] rounded-xl appearance-none focus:outline-none focus:ring-0"
              />
              <label
                htmlFor="location"
                className={`absolute left-4 transition-all duration-300 bottom-[-2px] text-customGrey3 font-sans text-base font-medium cursor-text ${focusedField === 'location' || formData.location ? 'top-[4%] text-sm' : 'top-[13px] text-lg'}`}
                onClick={() => document.getElementById('location')?.focus()}
              >
                Location<span className="text-customOrange">*</span>
              </label>
            </div>

            <div className={`relative mt-[10px] ${isInstituteActive ? '' : 'opacity-50 cursor-not-allowed'}`}>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                className="block w-[324px] bg-customGrey border border-customGrey2 text-black text-lg font-semibold px-4 pt-[21px] pb-[4px] rounded-xl appearance-none focus:outline-none focus:ring-0"
              />
              <label
                htmlFor="email"
                className={`absolute left-4 transition-all duration-300 bottom-[-2px]  text-customGrey3 font-sans text-base font-medium  cursor-text ${focusedField === 'phone' || formData.email ? 'top-[4%] text-sm' : 'top-[13px] text-lg'}`}
                onClick={() => document.getElementById('email')?.focus()}
              >
                Email<span className="text-customOrange">*</span>
              </label>
            </div>
            
            <div className={` flex px-2 pt-[5px] pb-[5px] your-element rounded-xl  mt-[11.5px]  ${isUploadActive ? '' : 'opacity-50 cursor-not-allowed'}`}>
              <button type="button" onClick={() => handleUploadButtonClick('studentsFileInput')}>
  <FiUpload
    className="text-gray-500 mr-2 bg-customICON rounded-md mt-1 ml-2"
    size={34}
  />
</button>
<p className="text-customGrey3 font-sans text-base font-medium mt-2">
{selectedStudentsFileName}
</p>

<label className="text-customGrey2 cursor-pointer relative">
        <input
          id="studentsFileInput"
          type="file"
          name="studentsFileInput"
          
          onChange={handleStudentsFileChange} 
          className="hidden" // Hide the input element
        />
      </label>

      </div>
      <div className={` flex px-2 pt-[5px] pb-[5px] your-element rounded-xl  mt-[11.5px]  ${isUploadActive ? '' : 'opacity-50 cursor-not-allowed'}`}>
      <button type="button" onClick={() => handleUploadButtonClick('teachersFileInput')}>
            <FiUpload className="text-gray-500 mr-2 bg-customICON rounded-md mt-1 ml-2" size={34} /></button> 
            <p className=" text-customGrey3 font-sans text-base font-medium mt-2">{selectedTeachersFileName}</p>
                <label className=" text-gray-700 cursor-pointer relative">
                <input
          id="teachersFileInput"
          type="file"
          name="teachersFileinput"
          accept=".csv, .xls, .xlsx"
          onChange={handleTeachersFileChange}
          className="hidden" // Hide the input element
        />
                 
                </label>
            </div>
            
            {/* <div className=" flex px-2 pt-[5px] pb-[5px] your-element  rounded-xl  mt-[11.5px] ">
            <button type="button" onClick={() => handleUploadButtonClick('coursesFileInput')}>
            <FiUpload className="text-gray-500 mr-2 bg-customICON rounded-md mt-1 ml-2" size={34} /></button> <p className=" text-customGrey3 font-sans text-base font-medium mt-2">{selectedCoursesFileName}</p>
                <label className=" text-gray-700 cursor-pointer relative">
                <input
          id="coursesFileInput"
          type="file"
          name="coursesFileInput"
          accept=".csv, .xls, .xlsx"
          onChange={handleCoursesFileChange}
          className="hidden" // Hide the input element
        />
                 
                </label>
            </div> */}

              <div className="flex px-2 pt-[5px] pb-[5px] border border-customBorder rounded-xl  mt-[11.5px]">
              <button type="button"   onClick={downloadSampleCsv} >
            <FiDownload
              className="text-gray-500 mr-2 bg-customICON rounded-md mt-1 ml-2"
              size={34}
            />
          
            </button>
            <p className="text-customGrey3 font-sans text-base font-medium mt-2">Download Sample CSV</p>
              </div>
                
  
            </form>
            <div className="flex justify-center mt-[50px]  gap-4">
               
            <button
              type="submit"
              className={`w-[360px] h-[48px] rounded-xl text-lg font-semibold ${isFormValid() ? 'bg-customAqua text-white' : 'bg-gray-300 text-white cursor-not-allowed'}`}
              disabled={!isFormValid()}
              onClick={handleSubmit}
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
function setSelectedFile(arg0: null) {
  throw new Error("Function not implemented.");
}

