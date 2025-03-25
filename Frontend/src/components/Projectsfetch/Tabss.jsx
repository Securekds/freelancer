import React, { useEffect, useState, useRef } from 'react';
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';


function Tabss({ handleDrawerClose }) {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'en';
  });
  const handleClickClose = () => {
    onClose(); // Call the passed-in close handler
  };

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const navigate = useNavigate();



  const TABS = [
    {
      title: (
        <Typography
          style={{
            fontSize: '1rem',
            fontWeight: '500',
            color: 'white',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
          }}
        >
          {location.pathname === '/projects/categories/writing/writing-content' ? t('Content writing') :
            location.pathname === '/projects/categories/writing/writing-articles' ? t('Writing Articles') :
              location.pathname === '/projects/categories/writing/content-editing' ? t('Content Edit') :
                location.pathname === '/projects/categories/writing/writing-reports' ? t('Writing Reports') :
                  location.pathname === '/projects/categories/writing/research-scientific' ? t('Research Scientific') :
                    location.pathname === '/projects/categories/writing/writing-online' ? t('Writing Online') :
                      ''}
        </Typography>
      ),
      Component: Pricing,
    },
  ].map((n, idx) => ({ ...n, id: idx + 1 }));

  // Initialize selected tab to show by default
  const [selected, setSelected] = useState(1); // Set default selected tab here

  return (


    <div
      style={{
        display: "flex",
        height: "24rem",
        width: "100%",
        justifyContent: "start",
        padding: "2rem",
        color: "white",
      }}
      className="md:justify-center"
    >
      <Tabs TABS={TABS} selected={selected} setSelected={setSelected} />
      <div
        style={{
          position: 'absolute',
          opacity: '0',
          zIndex: '111'
        }}
      >
        <Content selected={selected} dir="ltr" TABS={TABS} handleDrawerClose={handleDrawerClose} />

      </div>
    </div>
  );
};
const Tabs = ({ TABS, selected, setSelected }) => {
  const [dir, setDir] = useState(null);

  const handleSetSelected = (val) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }

    setSelected(val);
  };

  return (
    <div
      style={{ position: "relative", display: "flex", height: "fit-content", gap: "0.5rem" }}
    >
      {TABS.map((t) => {
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
          >
            {t.title}
          </Tab>
        );
      })}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} TABS={TABS} />}
      </AnimatePresence>
    </div>
  );
};

const Tabe = ({ children, tab, handleSetSelected, selected }) => {
  return (
    <button
      onClick={() => handleSetSelected(tab)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        borderRadius: "9999px",
        padding: "0.375rem 0.75rem",
        fontSize: "0.875rem",
        transition: "color 0.2s",
        border: '1px white solid',
        background: 'transparent',
        color: selected === tab ? "#f5f5f5" : "#9ca3af",
      }}
    >

      <FiChevronDown
        style={{
          transition: "transform 0.2s",
          transform: selected === tab ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
    </button>
  );
};
const Tab = ({ children, tab, handleSetSelected, selected }) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      style={{

        display: 'none'
      }}
    >


    </button>
  );
};

const Content = ({ selected, dir, TABS, handleDrawerClose }) => {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Retrieve language from localStorage on component mount
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'en'; // Default language is 'en' if no language is stored
  });
  const handleClickClose = () => {
    onClose(); // Call the passed-in close handler
  };

  const toggleLanguage = (language) => {
    localStorage.setItem('language', language); // Store selected language in localStorage
    setCurrentLanguage(language);
    i18n.changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch(error => console.error('Error changing language:', error));
  };
  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const isScreenUnder400px = useMediaQuery('(max-width:400px)');
  const isScreenUnder768px = useMediaQuery('(max-width:768px)');
  const isScreenUnder1200px = useMediaQuery('(max-width:1200px)');
  const isScreenUnder1440px = useMediaQuery('(max-width:1440px)');

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]); // Update  
  return (


    <div>
      {isScreenUnder400px ? (
        <motion.div className="Nabil"
          id="overlay-content"
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 8,
          }}
          style={{
            position: "absolute",
            right: '-167px',
            top: '-130px',
            width: '21rem',
            padding: "1rem",
            height: 'auto',
            zIndex: '10',
            borderRadius: '16px',
          }}
        >
          <div className="icon"
            style={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              cursor: 'pointer',
            }}
          >
            <CloseIcon
              onClick={handleDrawerClose}
              sx={{ fontSize: '19px' }} />
          </div>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: -1
          }} />


          <Nub selected={selected} />

          {TABS.map((t) => {
            return (
              <div style={{ overflow: "hidden" }} key={t.id}>
                {selected === t.id && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: dir === "l" ? 100 : dir === "r" ? -100 : 0,

                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <t.Component />
                  </motion.div>
                )}
              </div>
            );
          })}
        </motion.div>
      ) : isScreenUnder450px ? (
        <motion.div className="Nabil"
          id="overlay-content"
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 8,
          }}
          style={{
            position: "absolute",
            right: '-182px',
            top: '-240px',
            width: '23rem',
            padding: "1rem",
            height: 'auto',
            zIndex: '10',
            borderRadius: '16px',
          }}
        >
          <div className="icon"
            style={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              cursor: 'pointer',
            }}
          >
            <CloseIcon
              onClick={handleDrawerClose}
              sx={{ fontSize: '19px' }} />
          </div>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: -1
          }} />


          <Nub selected={selected} />

          {TABS.map((t) => {
            return (
              <div style={{ overflow: "hidden" }} key={t.id}>
                {selected === t.id && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: dir === "l" ? 100 : dir === "r" ? -100 : 0,

                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <t.Component />
                  </motion.div>
                )}
              </div>
            );
          })}
        </motion.div>
      ) : isScreenUnder768px ? (
        <motion.div className="Nabil"
          id="overlay-content"
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 8,
          }}
          style={{
            position: "absolute",
            right: '-316px',
            top: '-340px',
            width: '40rem',
            padding: "1rem",
            height: 'auto',
            zIndex: '10',
            borderRadius: '16px',
          }}
        >
          <div className="icon"
            style={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              cursor: 'pointer',
            }}
          >
            <CloseIcon
              onClick={handleDrawerClose}
              sx={{ fontSize: '19px' }} />
          </div>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: -1
          }} />


          <Nub selected={selected} />

          {TABS.map((t) => {
            return (
              <div style={{ overflow: "hidden" }} key={t.id}>
                {selected === t.id && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: dir === "l" ? 100 : dir === "r" ? -100 : 0,

                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <t.Component />
                  </motion.div>
                )}
              </div>
            );
          })}
        </motion.div>
      ) : isScreenUnder1200px ? (
        <motion.div className="Nabil"
          id="overlay-content"
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 8,
          }}
          style={{
            position: "absolute",
            right: '-317px',
            top: '-520px',
            width: '40rem',
            padding: "1rem",
            height: 'auto',
            zIndex: '10',
            borderRadius: '16px',
          }}
        >
          <div className="icon"
            style={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              cursor: 'pointer',
            }}
          >
            <CloseIcon
              onClick={handleDrawerClose}
              sx={{ fontSize: '19px' }} />
          </div>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: -1
          }} />


          <Nub selected={selected} />

          {TABS.map((t) => {
            return (
              <div style={{ overflow: "hidden" }} key={t.id}>
                {selected === t.id && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: dir === "l" ? 100 : dir === "r" ? -100 : 0,

                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <t.Component />
                  </motion.div>
                )}
              </div>
            );
          })}
        </motion.div>
      ) : isScreenUnder1440px ? (
        <motion.div className="Nabil"
          id="overlay-content"
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 8,
          }}
          style={{
            position: "absolute",
            right: '-320px',
            top: '-70px',
            width: '40rem',
            padding: "1rem",
            height: 'auto',
            zIndex: '10',
            borderRadius: '16px',
          }}
        >
          <div className="icon"
            style={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              cursor: 'pointer',
            }}
          >
            <CloseIcon
              onClick={handleDrawerClose}
              sx={{ fontSize: '19px' }} />
          </div>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: -1
          }} />


          <Nub selected={selected} />

          {TABS.map((t) => {
            return (
              <div style={{ overflow: "hidden" }} key={t.id}>
                {selected === t.id && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: dir === "l" ? 100 : dir === "r" ? -100 : 0,

                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <t.Component />
                  </motion.div>
                )}
              </div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div className="Nabil"
          id="overlay-content"
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 8,
          }}
          style={{
            position: "absolute",
            right: isScreenUnder450px ? '155px' : '400px',
            top: isScreenUnder450px ? '-20px' : '140px',
            width: isScreenUnder450px ? '22rem' : '40rem',
            padding: "1rem",
            height: '310px',
            zIndex: '10',
            borderRadius: '16px',
          }}
        >

          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: -1
          }} />

          <Bridge />

          <Nub selected={selected} />

          {TABS.map((t) => {
            return (
              <div style={{ overflow: "hidden" }} key={t.id}>
                {selected === t.id && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: dir === "l" ? 100 : dir === "r" ? -100 : 0,

                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <t.Component />
                  </motion.div>
                )}
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

const Bridge = () => (
  <div
    style={{ position: "absolute", top: "-24px", left: 0, right: 0, height: "24px" }}
  />
);

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    moveNub();
  }, [selected]);

  const moveNub = () => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  };

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
        position: "absolute",
        top: 0,
        height: "1rem",
        width: "1rem",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
        borderRadius: "0.25rem 0 0 0",
        backgroundColor: "#1c1c1e",
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    />
  );
};

const Pricing = () => {
  const { t } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'en';
  });

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const [inputLink, setInputLink] = useState('https://localhost:5173/post/Nabil');
  const textFieldRef = useRef(null);

  const handleCopyClick = async () => {
    if (textFieldRef.current) {
      const linkToCopy = textFieldRef.current.value;

      try {
        await navigator.clipboard.writeText(linkToCopy);
        toast.success('Link copied to clipboard!', {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 9000,
          style: {
            background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
            color: 'white',
          },
          icon: <IconWhite />,
          closeButton: <CloseButtonWhite />,
        });
      } catch (error) {
        console.error('Error copying: ', error);
        toast.error('Failed to copy link!', {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
        });
      }
    }
  };
  const IconWhite = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14H8v-2h2v2zm0-4H8V7h2v5zm6 4h-3v-2h2v-2h-2v-2h3V7h-5v10h5v2z" />
    </svg>
  );

  const notify = () => toast.success('Link Copied !');
  return (
    <div className="line">
      <div className="Toast">
        <ToastContainer toastClassName="custom-toast"
          toastStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            color: 'white'
          }} />
      </div>
      <div className="Share"
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          <Typography
            style={{
              fontFamily: '"Airbnbcereal", sans-serif',
              fontWeight: 'bold',
              fontSize: '20px',
              background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

            }}
          >
            {t('Social Share')}
          </Typography>
        </div>
        <Typography
          style={{
            fontFamily: '"Airbnbcereal", sans-serif',
            fontWeight: 'bold',
            fontSize: '20px',
            background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            color: 'transparent',
          }}
        >
          {t('Share link via')}
        </Typography>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#333',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <GitHubIcon style={{ color: 'white', width: '50px', height: '50px' }} />
            </div>
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#0077b5',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <img src="https://res.cloudinary.com/damicjacf/image/upload/v1718983411/png-transparent-in-icon-social-media-linkedin-computer-icons-linkedin-blue-text-trademark-thumbnail-removebg-preview_mpn6a9.png" alt="LinkedIn" style={{ width: '60px', height: '60px' }} />
            </div>
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#3b5998',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <FacebookRoundedIcon style={{ color: 'white', width: '55px', height: '55px' }} />
            </div>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#1da1f2',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden'
            }}>
              <img src="https://res.cloudinary.com/damicjacf/image/upload/v1718983532/indonesia-9-january-2024-twitter-260nw-2410058195_hsaxjc.webp" alt="Twitter" style={{ width: '65px', height: '65px', marginTop: '4px' }} />
            </div>
          </a>
        </div>
        <div className="Link">
          <TextField
            disabled
            id="outlined-basic"
            inputRef={textFieldRef}
            value={inputLink}
            variant="outlined"
            sx={{ marginTop: '20px', color: 'white', background: 'white' }}
            InputProps={{
              style: {
                height: '40px',
                padding: '0 14px',
                color: 'white'
              },
            }}
            InputLabelProps={{
              style: {
                top: '-5px',
              },
            }}
          />
        </div>
        <div className="CpyBTN"
          style={{
            marginTop: '10px',
          }}
        >
          <Button
            onClick={() => {
              handleCopyClick();
              notify('Link copied to clipboard!');
            }}
            className='btn-grad'
            sx={{
              width: '250px',
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

            }}
            variant="contained"
          >
            {t('Copy')}
          </Button>
        </div>
        <div className="div"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
          }}
        >
        </div>
      </div>
    </div>
  );
}


export default Tabss
