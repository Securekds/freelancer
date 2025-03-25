import { brainwaveSymbol, check } from "../assets";
import { collabApps, collabContent, collabText } from "../constants";
import Button from "./Button";
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import Section from "./Section";
import { LeftCurve, RightCurve } from "./design/Collaboration";

const Collaboration = () => {
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
    <Section crosses>
      <div className="container lg:flex">
        <div className="max-w-[25rem]">

          <Typography
            variant="h2"
            style={{
              fontFamily:
                currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                  "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
              color: 'white',
              fontWeight: '500',
              lineHeight: '65px',
            }}
          >
            {t('AI Chat App for seamless collaboration')}
          </Typography>

          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {collabContent.map((item) => (
              <li className="mb-3 py-3" key={item.id}>
                <div className="flex items-center">
                  <img src={check} width={24} height={24} alt="check" />
                  <h6 className="body-2 ml-5">
                    <Typography
                      style={{
                        fontFamily:
                          currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                            "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                        color: 'white',
                        fontWeight: '500',

                      }}
                    >
                      {t(item.title)}
                    </Typography>
                  </h6>
                </div>
                {item.text && (
                  <p className="body-2 mt-3 text-n-4">
                    <Typography
                      style={{
                        fontFamily:
                          currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                            "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                        color: 'grey',
                        fontWeight: '500',

                      }}
                    >
                      {t(item.text)}
                    </Typography>
                  </p>
                )}
              </li>
            ))}
          </ul>

          <Button
            sx={{ border: '1px solid white' }}



          >
            <Typography
              style={{
                fontFamily:
                  currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                    "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                color: 'white',
                fontWeight: '500',

              }}
            >
              {t('Try it now')}
            </Typography>


          </Button>
        </div>

        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <p className="body-2 mb-8 text-n-4 md:mb-16 lg:mb-32 lg:w-[22rem] lg:mx-auto">
            <Typography
              style={{
                fontFamily:
                  currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' :
                    "AeonikPro, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                color: 'grey',
                fontWeight: '500',
                lineHeight: '25px',
              }}
            >
              {t(collabText)}
            </Typography>
          </p>

          <div 
            style={{
              position: "relative",
              left: currentLanguage === 'ar'? '0%' : "50%",
              display: "flex",
              width: "27rem",
              aspectRatio: "1 / 1",
              border: "2px solid white",
              borderRadius: "50%",
              transform: "translateX(-50%) scale(0.75)",
            }}
          >
            {/* Inner Circle */}
            <div
              style={{
                display: "flex",
                width: "15rem",
                aspectRatio: "1 / 1",
                margin: "auto",
                borderRadius: "50%",
                border: "2px solid white",
              }}
            >
              {/* Icon Container */}
              <div
                style={{
                  width: "6rem",
                  aspectRatio: "1 / 1",
                  margin: "auto",
                  padding: "0.2rem",
                  background: 'linear-gradient(135deg, #9c70ff 0%,rgb(55, 39, 114) 100%)',
                  borderRadius: "50%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#222", // Adjust as needed
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src="/src/assets/images/small-logos/Mylogo.png"
                    width={90}
                    height={90}
                    alt="brainwave"
                  />
                </div>
              </div>
            </div>

            {/* App Icons */}
            <ul style={{ position: "absolute", top: 0, left: "50%", height: "100%" }}>
              {collabApps.map((app, index) => (
                <li
                  key={app.id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    height: "50%",
                    marginLeft: "-1.6rem",
                    transformOrigin: "bottom",
                    transform: `rotate(${index * 45}deg)`,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      top: "-1.6rem",
                      display: "flex",
                      width: "3.2rem",
                      height: "3.2rem",
                      backgroundColor: "#333",
                      borderRadius: "8px",
                      transform: `rotate(-${index * 45}deg)`,
                      border: "2px solid white",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      width={app.width}
                      height={app.height}
                      alt={app.title}
                      src={app.icon}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <LeftCurve />
            <RightCurve />
          </div>

        </div>
      </div>
    </Section>
  );
};

export default Collaboration;
