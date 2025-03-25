import Section from "./Section";
import Heading from "./Heading";
import { service1, service2, service3, check } from "../assets";
import { Typography } from '@mui/material';
import i18n from 'i18next';
import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { brainwaveServices, brainwaveServicesIcons } from "../constants";
import {
  PhotoChatMessage,
  Gradient,
  VideoBar,
  VideoChatMessage,
} from "./design/Services";

import Generating from "./Generating";

const Services = () => {
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
      // Retrieve language from localStorage on component mount
      const storedLanguage = localStorage.getItem('language');
      return storedLanguage || 'en'; // Default language is 'en' if no language is stored
    });
  
    const toggleLanguage = (language) => {
      localStorage.setItem('language', language); // Store selected language in localStorage
      setCurrentLanguage(language);
      i18n.changeLanguage(language)
        .then(() => console.log('Language changed successfully'))
        .catch(error => console.error('Error changing language:', error));
    };
  
    useEffect(() => {
      i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]); // Update  
  return (
    <Section id="how-to-use">
      <div className="container"
      style={{
        display : 'flex',
        flexDirection : 'column',
      }}
      >
        <Heading
          title="AI is coming to Khadamat-Platform! Get ready for intelligent assistance"
          text="creative tools, and next-level automation to enhance your freelancing experience."
        />

        <div className="relative">
          <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8  rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]"
          style={{border :'1px solid grey'}}
          >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
              <img
                className="w-full h-full object-cover md:object-right"
                width={800}
                alt="Smartest AI"
                height={730}
                src={service1}
              />
            </div>

            <div className="relative z-1 max-w-[17rem] ml-auto">
              <h4 className="h4 mb-4">
              <Typography
            style={{
              fontFamily:
                currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                  "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                  color : 'white',
                  fontSize : '29px',
                  fontWeight: '500',
                  textWrap : 'nowrap',
                 
            }}
          >
             {t('Smart AI Assistance')}
          </Typography>
               
                </h4>
              <p className="body-2 mb-[3rem] text-n-3">
              <Typography
            style={{
              fontFamily:
                currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                  "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                  color : 'grey',
                  fontSize : '20px',
                  fontWeight: '500',
                 
            }}
          >
             {t('From fixing typos to generating text ideas, our AI assistant will help you work smarter, not harder.')}
          </Typography>
              </p>
              <ul className="body-2">
                {brainwaveServices.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start py-4 border-t border-n-6"
                    style={{
                      gap : '5px',
                    }}
                  >
                    <img width={24} height={24} src={check} />
                    <p className="ml-4">
                    <Typography
            style={{
              fontFamily:
                currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                  "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                  color : 'white',
                  fontSize : '20px',
                  fontWeight: '500',
                  textWrap : 'nowrap',
                 
            }}
          >
              {t(item)}
          </Typography>
                     

                    </p>
                  </div>
                ))}
              </ul>
            </div>

            <Generating className="absolute left-4 right-4 bottom-4  lg:left-1/2 lg-right-auto lg:bottom-8 lg:-translate-x-1/2"
             
             />
          </div>

          <div className="relative z-1 grid gap-5 lg:grid-cols-2">
            <div className="relative min-h-[39rem]  rounded-3xl overflow-hidden"
            style={{border :'1px solid grey'}}
            >
              <div className="absolute inset-0">
                <img
                  src={service2}
                  className="h-full w-full object-cover"
                  width={630}
                  height={750}
                  alt="robot"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">
                <h4 className="h4 mb-4">
                       <Typography
            style={{
              fontFamily:
                currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                  "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                  color : 'white',
                  fontSize : '29px',
                  fontWeight: '500',
                 
            }}
          >
            {t('Photo editing')}
          </Typography>
                  

                </h4>
                <p className="body-2 mb-[3rem] text-n-3">
                <Typography
            style={{
              fontFamily:
                currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                  "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                  color : 'grey',
                  fontSize : '20px',
                  fontWeight: '500',
                 
            }}
          >
            {t('Edit like a pro with AI! Our smart tools will help you enhance, retouch, and transform images effortlessly.')}
          </Typography>
                </p>
              </div>

              <PhotoChatMessage />
            </div>

            <div className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem]"
            style={{border :'1px solid grey'}}
            >
              <div className="py-12 px-4 xl:px-8">
                <h4 className="h4 mb-4">
                <Typography
            style={{
              fontFamily:
                currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                  "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                  color : 'white',
                  fontSize : '29px',
                  fontWeight: '500',
                 
            }}
          >
            {t('Video generation')}
          </Typography>
                 

                </h4>
                <p className="body-2 mb-[2rem] text-n-3">
                <Typography
            style={{
              fontFamily:
                currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                  "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                  color : 'grey',
                  fontSize : '20px',
                  fontWeight: '500',
                 
            }}
          >
            {t('Create professional-grade videos with the power of AI. Transform ideas into stunning visuals!')}
          </Typography>
                  
                </p>

                <ul className="flex items-center justify-between">
                  {brainwaveServicesIcons.map((item, index) => (
                    <li
                      key={index}
                      className={`rounded-2xl flex items-center justify-center ${
                        index === 2
                          ? "w-[3rem] h-[3rem] p-0.25 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]"
                          : "flex w-10 h-10 bg-n-6 md:w-15 md:h-15"
                      }`}
                    >
                      <div
                        className={
                          index === 2
                            ? "flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]"
                            : ""
                        }
                      >
                        <img src={item} width={24} height={24} alt={item} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]"
              style={{border :'1px solid grey'}}
              >
                <img
                  src={service3}
                  className="w-full h-full object-cover"
                  width={520}
                  height={400}
                  alt="Scary robot"
                />

                <VideoChatMessage />
                <VideoBar />
              </div>
            </div>
          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Services;
