
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useState, useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MailLockIcon from '@mui/icons-material/MailLock';
import PaidIcon from '@mui/icons-material/Paid';
import { Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import * as React from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import InventoryIcon from '@mui/icons-material/Inventory';
import AvatarGroup from '@mui/material/AvatarGroup';
import useMediaQuery from '@mui/material/useMediaQuery';
import MyChart from '../chart/Mychart';
import Linechart from '../chart/Linechart';
import MyLineChart3 from '../chart/MyLineChart3';
import { height } from '@mui/system';

function Dashboardcontent() {


  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'en';
  });

  const toggleLanguage = (language) => {
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
    i18n
      .changeLanguage(language)
      .then(() => console.log('Language changed successfully'))
      .catch((error) => console.error('Error changing language:', error));
  };

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);


  const sample = [
    ['Swithing Progress', 237, '$3,000',
      <div style={{
        height: '6px',
        width: '150px',
        background: 'white',
        borderRadius: '0.375rem',

      }} >
        <div
          style={{
            height: '6px',
            width: '100%',
            background: 'linear-gradient(195deg, #66BB6A, #43A047)',
            borderRadius: '0.125rem',

          }}

        >

        </div>

      </div>
    ],
    ['Ice cream sandwich', 237, '$3,000',
      <div style={{
        height: '6px',
        width: '150px',
        background: 'white',
        borderRadius: '0.375rem',

      }} >
        <div
          style={{
            height: '6px',
            width: '100%',
            background: 'linear-gradient(195deg, #66BB6A, #43A047)',
            borderRadius: '0.125rem',

          }}

        >

        </div>

      </div>
    ],
    ['Fix Platform Errors', 262, 'Not set',
      <div style={{
        height: '6px',
        width: '150px',
        background: 'white',
        borderRadius: '0.375rem',

      }} >
        <div
          style={{
            height: '6px',
            width: '40%',
            background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
            borderRadius: '0.125rem',

          }}

        >

        </div>

      </div>
    ],
    ['Launch our Mobile App', 305, '$1200',
      <div style={{
        height: '6px',
        width: '150px',
        background: 'white',
        borderRadius: '0.375rem',

      }} >
        <div
          style={{
            height: '6px',
            width: '20%',
            background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
            borderRadius: '0.125rem',

          }}

        >

        </div>

      </div>
    ],
    ['Add the New Page', 356, '$18,000',
      <div style={{
        height: '6px',
        width: '150px',
        background: 'white',
        borderRadius: '0.375rem',

      }} >
        <div
          style={{
            height: '6px',
            width: '36%',
            background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
            borderRadius: '0.125rem',

          }}

        >

        </div>

      </div>
    ],


  ];

  const imageUrls = [
    'http://localhost:3000/static/media/logo-xd.6e37886f94dba0c2967ece68a152e30c.svg',
    'http://localhost:3000/static/media/logo-atlassian.f2b0e8570a4b4ce768854ff3dad1a6e1.svg',
    'http://localhost:3000/static/media/logo-slack.7c47c5aa474b5c4fb39fcf05ffb8e4e7.svg',
    'http://localhost:3000/static/media/logo-spotify.e83cf56c9d99a1fdf59e8deb58bbe470.svg',
    'http://localhost:3000/static/media/logo-jira.c19fd4e416babfbd0fdb0a794188c601.svg',
    'http://localhost:3000/static/media/logo-invision.a1062115730dcd10e1c4f4abe7b9ab33.svg',
    'http://localhost:3000/static/media/logo-invision.a1062115730dcd10e1c4f4abe7b9ab33.svg',
  ];

  function createData(PROJECTNAME, MEMBERS, BUDGET, COMPLETION) {
    return {
      PROJECTNAME,
      MEMBERS,
      BUDGET,
      COMPLETION,
    };
  }

  const rows = sample.map((item, index) => createData(...item));

  const columns = [
    {
      width: 200,
      label: (
        <Typography
          sx={{
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            color: 'white',
            marginLeft: currentLanguage === 'ar' ? '123px' : 'undifined',
            fontSize: currentLanguage === 'ar' ? '13px' : '13px',
          }}
        >
          {t('PROJECT NAME')}
        </Typography>
      ),
      dataKey: 'PROJECTNAME',
    },
    {
      width: 120,
      label: (
        <Typography
          sx={{
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            color: 'white',
            fontSize: currentLanguage === 'ar' ? '13px' : '13px',
          }}
        >
          {t('MEMBERS')}
        </Typography>
      ),
      dataKey: 'MEMBERS',
      numeric: true,
    },
    {
      width: 120,
      label: (
        <Typography
          sx={{
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            color: 'white',
            fontSize: currentLanguage === 'ar' ? '13px' : '13px',
          }}
        >
          {t('BUDGET')}
        </Typography>
      ),
      dataKey: 'BUDGET',
      numeric: true,
    },
    {
      width: 120,
      label: (
        <Typography
          sx={{
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            color: 'white',
            fontSize: currentLanguage === 'ar' ? '13px' : '13px',
            marginRight: currentLanguage === 'ar' ? '40px' : 'undifined',
          }}
        >
          {t('COMPLETION')}
        </Typography>
      ),
      dataKey: 'COMPLETION',
      numeric: true,
    },
  ];

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} style={{ borderRadius: 0 }} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} sx={{ height: '70px' }} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? 'right' : 'left'}
            style={{
              width: column.width,
              backgroundColor: '',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '12px',
              fontWeight: '700',
              opacity: '0.7',
              padding: '20px',
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? 'right' : 'left'}
            style={{ backgroundColor: '', color: 'white', fontWeight: 'bold' }}
          >
            {column.dataKey === 'PROJECTNAME' ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={imageUrls[_index]} alt={row.PROJECTNAME}
                  style={{
                    marginRight: currentLanguage === 'ar' ? '-5px' : '10px',
                    width: '40px',
                    height: 'auto',
                  }} />
                {row[column.dataKey]}
              </div>
            ) : column.dataKey === 'MEMBERS' ? (
              <AvatarGroup total={4}
                sx={{
                  position: currentLanguage === 'ar' ? 'relative' : 'undifined',
                  left: currentLanguage === 'ar' ? '47px' : 'undifined',
                }}
              >
                <Avatar sx={{ width: '22px', height: '22px', }} alt="Remy Sharp" src="http://localhost:3000/static/media/team-1.0fd36e0ee93dcfacdef8.jpg" />
                <Avatar sx={{ width: '22px', height: '22px' }} alt="Travis Howard" src="http://localhost:3000/static/media/team-4.85c82b6e60178804017f.jpg" />
                <Avatar sx={{ width: '22px', height: '22px' }} alt="Agnes Walker" src="http://localhost:3000/static/media/team-2.13ae2ce3e12f4cfed420.jpg" />
                <Avatar sx={{ width: '22px', height: '22px' }} alt="Trevor Henderson" src="http://localhost:3000/static/media/team-3.0ef0be95e6850814c79e.jpg" />
              </AvatarGroup>
            ) : (
              row[column.dataKey]
            )}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  function ReactVirtualizedTable() {
    return (
      <div style={{
        position: 'relative',
        top: '50px',

      }}>
        <Paper style={{ height: 410, width: '130%' }} sx={{ backgroundColor: 'transparent', borderRadius: 'none' }}>
          <TableVirtuoso
            data={rows}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </div>
    );
  }

  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  return (
   
    <div className='' style={{ height: 'auto' }} >
      <div className='MAIN '
        style={{
          position: currentLanguage === 'ar' ? 'relative' : 'undifined',
          right: currentLanguage === 'ar' ? '230px' : 'undifined',

        }}
      >
        <div style={{
          position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
          left: currentLanguage === 'ar' && isScreenUnder450px ? '210px' : 'undefined',
        }}>
          <div className="Boxes"
            style={{
              position: 'relative',
              left: '125px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: isScreenUnder450px ? 'column' : 'undifined',
              marginTop: '50px',

            }}>

            <div className="Sold "
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */
                /* Blur effect */
                WebkitBackdropFilter: 'blur(10px)', /* Blur effect for Safari */
                borderRadius: '0.75rem',
                height: '135px',
                position: isScreenUnder450px ? 'relative' : 'undefined',
                right: isScreenUnder450px ? '115px' : 'undefined',
                top: isScreenUnder450px ? '-20px' : 'undefined',
                boxShadow: '0 0.3rem 0.8rem rgba(0, 0, 0, 0.12)', /* Subtle shadow */
                width: isScreenUnder450px ? '90%' : '210px',
                color: '#344767',
                margin: '0 10px'
              }}>
              <div style={{
                position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
                left: currentLanguage === 'ar' && isScreenUnder450px ? '155px' : 'undefined',
              }}>
                <div className='IconMobile'
                  style={{
                    position: isScreenUnder450px ? 'relative' : 'undifined',
                    right: isScreenUnder450px ? '185px' : 'undifined',
                  }}
                >
                  <div className="FloatingIcon1" style={{
                    position: 'absolute',
                    top: '-25px',
                    left: currentLanguage === 'ar' ? '310px' : '200px',
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(195deg, #323a54, #111827)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '65px',
                    height: '60px',
                    borderRadius: '15px',

                    boxShadow: '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14),0rem 0.4375rem 0.625rem -0.3125rem rgba(64, 64, 64, 0.4)',

                  }}

                  >
                    <PaidIcon sx={{
                      color: 'white',
                      fontSize: '30px',

                    }} />
                  </div>
                </div>
              </div>
              <div style={{
                position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
                left: currentLanguage === 'ar' && isScreenUnder450px ? '-21px' : 'undefined',
              }}>
                <div className='Soldtypo1Mobile'
                  style={{
                    position: isScreenUnder450px ? 'relative' : 'undifined',
                    left: isScreenUnder450px ? '148px' : 'undifined',
                  }}
                >
                  <div className="SoldTypo"
                    style={{
                      position: 'relative',
                      left: currentLanguage === 'fr' ? '120px' : '140px',
                      top: '10px',


                    }}
                  >
                    <Typography sx={{
                      color: 'white',
                      fontWeight: '300',
                      fontSize: currentLanguage === 'ar' ? '14px' : '16px',
                      position: currentLanguage === 'ar' ? 'relative' : 'undifined',
                      right: currentLanguage === 'ar' && isScreenUnder450px ? '530px' : '930px',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }} >
                      {t('Balance')}
                      <span style={{
                        display: 'block',
                        color: 'white',
                        fontSize: '18px',
                        marginLeft: '7px',

                      }} >
                        0.00$
                      </span>
                    </Typography>

                  </div>
                </div>
              </div>
              <div style={{
                position: currentLanguage === 'fr' ? 'relative' : 'undifined',
                top: currentLanguage === 'fr' ? '-5px' : 'undifined',
              }} >
                <div className='1DividerMobile '
                  style={{
                    position: isScreenUnder450px ? 'relative' : 'undifined',
                    top: isScreenUnder450px ? '-10px' : 'undifined',
                  }}
                >
                  <div className='Divider' style={{ height: '0.5px', width: '100%', marginTop: '40px' }}></div>
                  <div className="Divider" style={{ height: '0.5px', width: '100%', background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))' }}></div>
                </div>
              </div>
              <div className="Week "
                style={{
                  marginTop: '8px',
                  position: currentLanguage === 'ar' ? 'relative' : 'undifined',
                  right: currentLanguage === 'ar' && isScreenUnder450px ? '6px' : '700px',

                }}
              >
                <div style={{
                  position: currentLanguage === 'fr' ? 'relative' : 'undifined',
                  top: currentLanguage === 'fr' ? '-5px' : 'undifined',
                }} >
                  <Typography sx={{
                    color: '#ffffffcc',
                    fontWeight: '300',
                    fontSize: '16px',
                    fontWeight: '300',

                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  }} >
                    <span style={{ color: '#4CAF50', margin: '10px', fontWeight: '700' }}>+0.00%</span>
                    {t('last week')}

                  </Typography>
                </div>
              </div>
            </div>
            <div className="Projects"
              style={{
                border: '0 solid rgba(0, 0, 0, 0.125)',
                borderRadius: '0.75rem',
                background: '#202940',
                boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                height: '135px',
                width: isScreenUnder450px ? '90%' : '210px',
                margin: '0 10px',
                position: isScreenUnder450px ? 'relative' : 'undifined',
                right: isScreenUnder450px ? '115px' : 'undifined',
                marginTop: isScreenUnder450px ? '18px' : 'undifined',
                backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */

                WebkitBackdropFilter: 'blur(10px)', /* Blur effect for Safari */


              }}>
              <div style={{
                position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
                left: currentLanguage === 'ar' && isScreenUnder450px ? '155px' : 'undefined',
              }}>
                <div className='Icon2Mobile'
                  style={{
                    position: isScreenUnder450px ? 'relative' : 'undifined',
                    right: isScreenUnder450px ? '413px' : 'undifined',

                  }}
                >
                  <div className="FloatingIcon2" style={{
                    position: 'absolute',
                    top: '-25px',
                    left: currentLanguage === 'ar' ? '542px' : '430px',
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '65px',
                    height: '60px',
                    borderRadius: '15px',
                    boxShadow: '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14),0rem 0.4375rem 0.625rem -0.3125rem rgba(0, 187, 212, 0.4)',
                  }}
                  >
                    <AccountTreeIcon sx={{
                      color: 'white',
                      fontSize: '30px',
                    }} />
                  </div>
                </div>
              </div>
              <div className='ProjectTypoMobile'
                style={{
                  position: isScreenUnder450px ? 'relative' : 'undifined',
                  left: isScreenUnder450px ? '150px' : 'undifined',
                }}
              >
                <div style={{
                  position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
                  left: currentLanguage === 'ar' && isScreenUnder450px ? '-105px' : 'undefined',
                }}>
                  <div className="ProjectTypo"
                    style={{
                      position: 'relative',
                      left: ' 140px',
                      top: '10px',

                    }}
                  >
                    <div style={{
                      position: currentLanguage === 'ar' ? 'relative' : "undifined",
                      right: currentLanguage === 'ar' ? '468px' : 'undifined',
                    }} >
                      <div className='' >
                        <Typography sx={{
                          color: 'white',
                          fontWeight: '300',
                          fontSize: currentLanguage === 'ar' ? '14px' : '16px',
                          fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        }} >
                          {t('Projects')}
                          <span style={{
                            display: 'block',
                            color: 'white',
                            fontSize: currentLanguage === 'fr' ? '14px' : '18px',
                            marginLeft: currentLanguage === 'fr' ? '1px' : '15px',

                          }} >
                            {t('New')}
                          </span>
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='ProjectDividerMobile'
                style={{
                  position: isScreenUnder450px ? 'relative' : 'undifined',
                  top: isScreenUnder450px ? '-10px' : 'undifined',
                }}
              >
                <div className='Divider' style={{ height: '0.5px', width: '100%', marginTop: '40px' }}></div>
                <div className="Divider" style={{ height: '0.5px', width: '100%', background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))' }}></div>
              </div>
              <div className="Projects "
                style={{
                  marginTop: '8px',
                  position: currentLanguage === 'ar' ? 'relative' : 'undifined',
                  right: currentLanguage === 'ar' ? '238px' : 'undifined',

                }}
              >
                <div style={{
                  position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
                  left: currentLanguage === 'ar' && isScreenUnder450px ? '234px' : 'undefined',
                }}>
                  <Typography sx={{
                    color: '#ffffffcc',
                    fontWeight: '300',
                    fontSize: '16px',
                    fontWeight: '300',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  }} >
                    <span style={{ color: '#4CAF50', margin: '10px', fontWeight: '700' }}>+0.00%</span>
                    {t('last week')}

                  </Typography>
                </div>
              </div>
            </div>
            <div className="Messages"
              style={{
                border: '0 solid rgba(0, 0, 0, 0.125)',
                borderRadius: '0.75rem',
                background: '#202940',
                boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                height: '135px',
                width: isScreenUnder450px ? '90%' : '210px',
                margin: '0 10px',
                marginTop: isScreenUnder450px ? '37px' : 'undifined',
                position: isScreenUnder450px ? 'relative' : 'undifined',
                right: isScreenUnder450px ? '115px' : 'undifined',
                backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */

                WebkitBackdropFilter: 'blur(10px)', /* Blur effect for Safari */
              }}>
              <div style={{
                position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
                left: currentLanguage === 'ar' && isScreenUnder450px ? '150px' : 'undefined',
              }}>
                <div className='Icon3Mobile'
                  style={{
                    position: isScreenUnder450px ? 'relative' : 'undifined',
                    right: isScreenUnder450px ? '640px' : 'undifined',
                  }}
                >
                  <div className="FloatingIcon3" style={{
                    position: 'absolute',
                    top: '-25px',
                    left: currentLanguage === 'ar' ? '773px' : '657px',
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(195deg, #66BB6A, #43A047)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '65px',
                    height: '60px',
                    borderRadius: '15px',
                    boxShadow: '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14),0rem 0.4375rem 0.625rem -0.3125rem rgba(76, 175, 79, 0.4)',
                  }}
                  >
                    <MailLockIcon sx={{
                      color: 'white',
                      fontSize: '30px',
                    }} />


                  </div>
                </div>
              </div>
              <div className='MessagesMobile'
                style={{
                  position: isScreenUnder450px ? 'relative' : 'undifined',
                  left: isScreenUnder450px ? '145px' : 'undifined',
                }}
              >
                <div className="MessagesTypo"
                  style={{
                    position: 'relative',
                    left: ' 130px',
                    top: '10px',

                  }}
                >
                  <div style={{
                    position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
                    left: currentLanguage === 'ar' && isScreenUnder450px ? '-560px' : 'undefined',
                  }}>
                    <Typography sx={{
                      color: 'white',
                      fontWeight: '300',
                      fontSize: '16px',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }} >
                      {t('Messages')}
                      <span style={{
                        display: 'block',
                        color: 'white',
                        fontSize: currentLanguage === 'fr' ? '14px' : '18px',
                        marginLeft: currentLanguage === 'fr' ? '1px' : '15px',

                      }} >
                        {t('New')}
                      </span>
                    </Typography>
                  </div>
                </div>
              </div>

              <div className='MessagesDividerMobile'
                style={{
                  position: isScreenUnder450px ? 'relative' : 'undifined',
                  top: isScreenUnder450px ? '-10px' : 'undifined',
                }}
              >
                <div className='Divider' style={{ height: '0.5px', width: '100%', marginTop: '40px' }}></div>
                <div className="Divider" style={{ height: '0.5px', width: '100%', background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))' }}></div>
              </div>
              <div className="Projects "
                style={{
                  marginTop: '8px',
                  position: currentLanguage === 'ar' ? 'relative' : 'undifined',
                  left: currentLanguage === 'ar' ? '225px' : 'undifined',
                }}
              >
                <div style={{
                  position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
                  left: currentLanguage === 'ar' && isScreenUnder450px ? '-230px' : 'undefined',
                }}>
                  <Typography sx={{
                    color: '#ffffffcc',
                    fontWeight: '300',
                    fontSize: '16px',
                    fontWeight: '300',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  }} >
                    <span style={{ color: '#4CAF50', margin: '10px', fontWeight: '700' }}>+0.00%</span>
                    {t('last week')}

                  </Typography>
                </div>
              </div>
            </div>

            <div className="Followers "
              style={{
                border: '0 solid rgba(0, 0, 0, 0.125)',
                borderRadius: '0.75rem',
                background: '#202940',
                boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
                height: '135px',
                width: isScreenUnder450px ? '90%' : '210px',
                margin: '0 10px',
                position: isScreenUnder450px ? 'relative' : 'undifined',
                right: isScreenUnder450px ? '115px' : 'undifined',
                marginTop: isScreenUnder450px ? '37px' : 'undifined',
                backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
                border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */


              }}>
              <div style={{
                position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
                left: currentLanguage === 'ar' && isScreenUnder450px ? '150px' : 'undefined',
              }}>
                <div className='Icon4Mobile '
                  style={{
                    position: isScreenUnder450px ? 'relative' : 'undifined',
                    right: isScreenUnder450px ? '870px' : 'undifined',
                  }}
                >
                  <div className="FloatingIcon4" style={{
                    position: 'absolute',
                    top: '-25px',
                    left: currentLanguage === 'ar' ? '1004px' : '888px',
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(195deg, #EC407A, #D81B60)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '65px',
                    height: '60px',
                    borderRadius: '15px',
                    boxShadow: '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14),0rem 0.4375rem 0.625rem -0.3125rem rgba(233, 30, 98, 0.4)',
                  }}
                  >
                    <GroupAddIcon sx={{
                      color: 'white',
                      fontSize: '30px',
                    }} />
                  </div>
                </div>
              </div>
              <div className='FollowertypoMobile'
                style={{
                  position: isScreenUnder450px ? 'relative' : 'undifined',
                  left: isScreenUnder450px ? '145px' : 'undifined',
                }} >
                <div className="FollowerTypo"
                  style={{
                    position: 'relative',
                    left: ' 130px',
                    top: '10px',

                  }}
                >
                  <div className='' style={{
                    position: currentLanguage === 'ar' ? 'relative' : "undifined",
                    left: currentLanguage === 'ar' ? '468px' : 'undifined',
                  }} >
                    <div style={{
                      position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
                      right: currentLanguage === 'ar' && isScreenUnder450px ? '1020px' : 'undefined',
                    }}>
                      <Typography sx={{
                        color: 'white',
                        fontWeight: '300',
                        fontSize: '16px',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      }} >
                        {t('Followers')}
                        <span style={{
                          display: 'block',
                          color: 'white',
                          fontSize: currentLanguage === 'fr' ? '14px' : '18px',
                          marginLeft: currentLanguage === 'fr' ? '1px' : '17px',

                        }} >
                          {t('New')}
                        </span>
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className='FollowerDividerMobild'
                style={{
                  position: isScreenUnder450px ? 'relative' : 'undifined',
                  top: isScreenUnder450px ? '-10px' : 'undifined',
                }}
              >
                <div className='Divider' style={{ height: '0.5px', width: '100%', marginTop: '40px' }}></div>
                <div className="Divider" style={{ height: '0.5px', width: '100%', background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))' }}></div>
              </div>
              <div className="Followers"
                style={{
                  marginTop: '8px',
                  position: currentLanguage === 'ar' ? 'relative' : 'undifined',
                  left: currentLanguage === 'ar' ? '692px' : 'undifined',
                }}
              >
                <div style={{
                  position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
                  left: currentLanguage === 'ar' && isScreenUnder450px ? '-695px' : 'undefined',
                }}>
                  <Typography className='' sx={{
                    color: '#ffffffcc',
                    fontWeight: '300',
                    fontSize: '16px',
                    fontWeight: '300',
                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  }} >
                    <span style={{ color: '#4CAF50', margin: '10px', fontWeight: '700' }}>+0.00%</span>
                    {t('last week')}

                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ChartBoxes "
          style={{
            position: 'relative',
            left: '280px',
            display: isScreenUnder450px ? 'undifined' : 'flex',
            justifyContent: 'center',
            marginTop: '50px',
            right: currentLanguage === 'ar' && isScreenUnder450px ? '-375px' : 'undefined',

          }}
        >
          <div className="Chart1 " style={{
            border: '0 solid rgba(0, 0, 0, 0.125)',
            borderRadius: '0.75rem',
            height: '335px',
            boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
            width: isScreenUnder450px ? '90%' : '290px',
            background: '#202940',
            color: '#344767',
            margin: '0 10px',
            position: 'relative',
            right: '155px',
            left: isScreenUnder450px ? '-270px' : 'undifined',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.18)',

          }}>
            <div
              className="FloatingIcon1"
              style={{
                position: 'absolute',
                top: '-25px',
                left: '10px',
                background: 'linear-gradient(195deg, #323a54, #1a2215)',
                width: isScreenUnder450px ? '95%' : '265px',
                height: '200px',
                borderRadius: '15px',
                background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
                boxShadow: '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14),0rem 0.4375rem 0.625rem -0.3125rem rgba(0, 187, 212, 0.4)',
                overflow: 'hidden',
              }}
            >
              {/* Background Image */}


              {/* Chart */}
              <div className="Chart1 " style={{



              }}>
                <MyChart />
              </div>
            </div>
            <div className="Chart1TYPO ">
              <div style={{
                position: currentLanguage === 'fr' ? 'relative' : 'undifined',
                left: currentLanguage === 'fr' ? '-5px' : 'undifined',
              }}>
                <Typography sx={{
                  color: 'white',
                  position: 'relative',
                  top: '200px',
                  left: currentLanguage === 'ar' ? '-20px' : '20px',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                  fontWeight: 'bold',
                  lineHeight: currentLanguage === 'ar' ? '28px' : 'undofined',
                }} >
                  {t('Daily active')}
                  <span style={{
                    display: 'block',
                    color: '#ffffffcc',
                    fontWeight: 'initial',
                    fontSize: '15px',


                  }} >
                    {t('Last Campaign Performance')}
                  </span>
                </Typography>
              </div>
              <div className='Chart1Divider '

              >
                <div className='Divider ' style={{ height: isScreenUnder450px ? '2px' : '0.5px', width: '100%', marginTop: '220px' }}></div>
                <div className="Divider" style={{ height: '0.5px', width: '100%', background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))' }}></div>
              </div>
              <div className='Icon ' style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                position: 'relative',
                top: '18px',
                left: currentLanguage === 'ar' ? '-17px' : '17px',

              }}>
                <AccessTimeIcon sx={{
                  color: '#ffffffcc',
                  fontSize: '17px',

                }} />
                <Typography sx={{
                  color: '#ffffffcc', position: 'relative',
                  left: currentLanguage === 'ar' ? '-8px' : '5px',
                  fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif'
                }} >
                  {t('campaign sent 2 days ago')}
                </Typography>
              </div>
            </div>


          </div>
          <div className="Chart2 " style={{
            border: '0 solid rgba(0, 0, 0, 0.125)',
            borderRadius: '0.75rem',
            height: '335px',
            boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
            width: isScreenUnder450px ? '90%' : '290px',
            background: '#202940',
            color: '#344767',
            margin: '0 10px',
            position: 'relative',
            right: '155px',
            left: isScreenUnder450px ? '-270px' : 'undifined',
            backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
            border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */


          }}>
            <div className="FloatingIcon1 " style={{
              position: 'absolute',
              top: '-25px',
              left: '10px',
              background: 'linear-gradient(195deg, #66BB6A, #43A047)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: isScreenUnder450px ? '95%' : '265px',
              height: '200px',
              borderRadius: '15px',

              boxShadow: '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14),0rem 0.4375rem 0.625rem -0.3125rem rgba(64, 64, 64, 0.4)',

            }}

            >


              {/* Chart */}
              <div className="Chart2 " style={{
                position: 'absolute',
                top: -20,
                left: -15,

              }}>
                <Linechart />
              </div>
              <div className='Chart2typoMobile'
                style={{
                  position: isScreenUnder450px ? 'relative' : 'undifined',
                  right: isScreenUnder450px ? '35px' : 'undifined',
                }}
              >
                <div style={{
                  position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
                  left: currentLanguage === 'ar' && isScreenUnder450px ? '40px' : 'undefined',
                }} >
                  <div className="Chart2TYPO "
                    style={{
                      position: currentLanguage === 'fr' ? 'relative' : 'undifined',
                      left: currentLanguage === 'fr' ? '30px' : 'undifined',

                    }}
                  >
                    <Typography sx={{
                      color: 'white',
                      position: 'relative',
                      top: '343px',
                      left: currentLanguage === 'ar' ? '28px' : '-22px',
                      fontWeight: 'bold',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }} >
                      {t('Daily Sales')}

                      <span className='' style={{
                        display: 'block',
                        color: '#ffffffcc',
                        fontWeight: 'initial',
                        lineHeight: currentLanguage === 'ar' ? '28px' : 'undifined',
                        fontSize: '15px',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                        whiteSpace: currentLanguage === 'fr' ? 'nowrap' : 'normal'

                      }} >
                        {t('(+15%) increase in today sales.')}
                      </span>
                    </Typography>
                    <div  >
                      <div className='Divider ' style={{
                        height: '0.5px',
                        width: '100%',
                        marginTop: '360px',







                      }}></div>
                    </div>
                    <div className='' style={{
                      position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
                      right: currentLanguage === 'ar' && isScreenUnder450px ? '-1px' : 'undefined',
                      width: currentLanguage === 'ar' && isScreenUnder450px ? '250px' : 'undefined',

                    }} >
                      <div className="Divider " style={{
                        height: '0.5px',
                        width: currentLanguage === 'ar' ? '145%' : (currentLanguage === 'fr' ? '103%' : '130%'),
                        background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))',
                        position: currentLanguage === 'ar' ? 'relative' : 'relative',
                        left: currentLanguage === 'ar' ? '50px' : '-30px',
                        top: currentLanguage === 'ar' ? '8px' : 'undifined',




                      }}></div>
                    </div>
                    <div className='Icon ' style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      position: 'relative',
                      top: currentLanguage === 'ar' ? '25px' : '18px',
                      left: currentLanguage === 'ar' ? '30px' : '-22px',

                    }}>
                      <AccessTimeIcon sx={{
                        color: '#ffffffcc',
                        fontSize: '17px',

                      }} />
                      <Typography sx={{
                        color: '#ffffffcc',
                        position: 'relative',
                        left: '5px',

                        marginRight: currentLanguage === 'ar' ? '13px' : 'undifined',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      }} >
                        {t('updated 4 min ago')}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className='Divider ' style={{ height: '0.5px', width: '100%', marginTop: '40px' }}></div>
            <div className="Divider " style={{
              height: '0.5px',
              width: '100%',
              display: currentLanguage === 'ar' && isScreenUnder450px ? 'none' : 'undefined',
              background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))',
              position: isScreenUnder450px ? 'relative' : 'undifined',
              top: isScreenUnder450px ? '264.6px' : 'undifined',
              opacity: isScreenUnder450px ? '0.3' : 'undifined',
            }}></div>
            <div className="Chart1TYPO"
              style={{ marginTop: '8px' }}
            >

            </div>
          </div>
          <div className="Chart3 " style={{
            border: '0 solid rgba(0, 0, 0, 0.125)',
            borderRadius: '0.75rem',
            height: '335px',
            boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
            width: isScreenUnder450px ? '90%' : '290px',
            background: '#202940',
            color: '#344767',
            margin: '0 10px',
            position: 'relative',
            right: '155px',
            top: isScreenUnder450px ? '40px' : 'undifined',
            left: isScreenUnder450px ? '-270px' : 'undifined',
            backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
            border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */


          }}>
            <div className="FloatingIcon1" style={{
              position: 'absolute',
              top: '-25px',
              left: '12px',
              background: 'linear-gradient(195deg, #323a54, #111827)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: isScreenUnder450px ? '95%' : '265px',
              height: '200px',
              borderRadius: '15px',
              boxShadow: '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14),0rem 0.4375rem 0.625rem -0.3125rem rgba(64, 64, 64, 0.4)',

            }}

            >
              <div className="Chart3 " style={{
                position: 'absolute',
                top: -20,
                left: -15,

              }}>
                <MyLineChart3 />
              </div>
              <div className='Chart3typoMobile'
                style={{
                  position: isScreenUnder450px ? 'relative' : 'undifined',
                  left: isScreenUnder450px ? '-10px' : 'undifined',
                }}
              >
                <div style={{
                  position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
                  right: currentLanguage === 'ar' && isScreenUnder450px ? '20px' : 'undefined',
                }} >

                  <div className="Chart3TYPO "
                    style={{
                      position: currentLanguage === 'fr' ? 'relative' : 'undifined',
                      left: currentLanguage === 'fr' ? '183px' : 'undifined',


                    }}
                  >
                    <div style={{
                      position: currentLanguage === 'en' ? 'relative' : 'undifined',
                      left: currentLanguage === 'en' ? '149px' : 'undifined',
                    }} >
                      <div style={{
                        position: currentLanguage === 'ar' ? 'relative' : 'undifined',
                        right: currentLanguage === 'ar' ? '150px' : 'undifined',
                      }}>
                        <div style={{
                          position: currentLanguage === 'fr' && isScreenUnder450px ? 'relative' : 'undefined',
                          right: currentLanguage === 'fr' && isScreenUnder450px ? '3px' : 'undefined',
                        }} >
                          <Typography sx={{
                            color: 'white',
                            position: 'relative',
                            top: '343px',
                            left: currentLanguage === 'ar' ? '217px' : '-180px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif'
                          }} >
                            {t('Completed Tasks')}
                            <span style={{
                              display: 'block',
                              color: '#ffffffcc',
                              fontWeight: 'initial',
                              fontSize: '15px',
                            }} >
                              {t('Last Campaign Performance')}
                            </span>
                          </Typography>
                        </div>
                      </div>

                      <div style={{
                        position: 'relative',
                        'right': currentLanguage === 'ar' ? '-220px' : '150px',
                        left: currentLanguage === 'fr' ? '-190px' : 'undifined',
                        top: currentLanguage == 'ar' ? '10px' : 'undifined',

                      }}>
                        <div className='Divider ' style={{
                          height: '0.5px',
                          width: isScreenUnder450px ? '240px' : '100%',
                          marginTop: '360px',



                        }}></div>
                        <div
                          style={{
                            position: currentLanguage === 'ar' ? 'relative' : 'undifined',
                            right: currentLanguage === 'ar' ? '150px' : 'undifined',
                          }}
                        >
                          <div style={{
                            position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
                            left: currentLanguage === 'ar' && isScreenUnder450px ? '10px' : 'undefined',
                            width: currentLanguage === 'ar' && isScreenUnder450px ? '160px' : 'undefined',
                          }} >
                            <div style={{
                              position: currentLanguage === 'fr' && isScreenUnder450px ? 'relative' : 'undefined',
                              right: currentLanguage === 'fr' && isScreenUnder450px ? '5px' : 'undefined',
                              width: currentLanguage === 'fr' && isScreenUnder450px ? '320px' : 'undefined',
                            }} >
                              <div className="Divider " style={{
                                height: '0.5px',
                                width: currentLanguage === 'ar' ? '220%' :
                                  (currentLanguage === 'fr' ? '107%' : '150%'),
                                background: 'linear-gradient(to right, rgba(52, 71, 103, 0), #ffffff, rgba(52, 71, 103, 0))',
                                position: currentLanguage === 'en' ? 'relative' : 'undifined',
                                right: currentLanguage === 'en' ? '49px' : 'undifined',
                                left: isScreenUnder450px ? '-60px' : 'undifined',




                              }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{
                        position: currentLanguage === 'fr' ? 'relative' : 'undifined',
                        left: currentLanguage === 'fr' ? '150px' : 'undifined',
                      }} >
                        <div className='Under450EN'
                          style={{
                            position: isScreenUnder450px ? 'relative' : 'undifined',
                            right: isScreenUnder450px ? '2px' : 'undifined',

                          }}
                        >
                          <div className='Ico ' style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            position: 'relative',
                            top: currentLanguage === 'ar' ? '28px' : '18px',
                            left: currentLanguage === 'ar' ? '70px' : '-328px',
                          }}>
                            <div style={{
                              position: currentLanguage === 'fr' && isScreenUnder450px ? 'relative' : 'undefined',
                              right: currentLanguage === 'fr' && isScreenUnder450px ? '3px' : 'undefined',
                            }} >
                              <AccessTimeIcon sx={{
                                color: '#ffffffcc',
                                fontSize: '17px',
                                position: currentLanguage === 'en' ? 'relative' : 'undifined',
                                left: currentLanguage === 'en' ? '145px' : 'undifined',
                                top: currentLanguage === 'en' ? '4px' : 'undifined',

                              }} />
                            </div>
                            <div
                              style={{
                                position: currentLanguage === 'ar' ? 'relative' : 'undifined',
                                right: currentLanguage === 'ar' ? '8px' : 'undifined',
                              }}
                            >

                              <div style={{
                                position: currentLanguage === 'fr' ? 'relative' : 'undifined',
                                left: currentLanguage === 'fr' ? '5px' : 'undifined',
                              }} >
                                <div style={{
                                  position: currentLanguage === 'fr' && isScreenUnder450px ? 'relative' : 'undefined',
                                  right: currentLanguage === 'fr' && isScreenUnder450px ? '2px' : 'undefined',
                                  top: currentLanguage === 'fr' && isScreenUnder450px ? '-4px' : 'undefined',
                                }} >
                                  <Typography sx={{
                                    position: 'relative',
                                    color: '#ffffffcc',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    left: currentLanguage === 'ar' ? '-9px' : '5px',
                                    whiteSpace: 'nowrap',
                                    position: currentLanguage === 'en' ? 'relative' : 'undifined',
                                    left: currentLanguage === 'en' ? '149px' : 'undifined',
                                  }} >
                                    {t('just updated')}
                                  </Typography>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

          </div>

        </div>
      </div>
      <div className="TABLES "
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: isScreenUnder450px ? '85px' : '50px',
          position: currentLanguage === 'ar' && isScreenUnder450px ? 'relative' : 'undefined',
          right: currentLanguage === 'ar' && isScreenUnder450px ? '47px' : 'undefined',
        }}
      >
        <div className="Table "
          style={{
            minHeight: '535px',
            width: isScreenUnder450px ? '90%' : '48%',
            background: '#202940',
            overflow: 'auto',
            borderRadius: '0.75rem',
            boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14),0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
            border: '0 solid rgba(0, 0, 0, 0.125)',
            transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            position: 'relative',
            right: currentLanguage === 'ar' ? '-48px' : '30px',
            top: '-28px',
            left: isScreenUnder450px ? '1px' : 'undifined',
            backgroundColor: 'rgba(0, 0, 0, 0.2)', /* Semi-transparent black background */
            border: '1px solid rgba(255, 255, 255, 0.18)', /* Light border */




          }}
        >
          <div className="FirstTypo"
            style={{
              position: 'relative',
              top: '25px',
              left: currentLanguage === 'ar' ? '-20px' : '25px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',


            }}
          >
            <Typography
              sx={{
                color: '#ffffff',
                fontWeight: 'bold',
                lineHeight: '20px',
                fontSize: '15px',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}
            >
              {t('Projects')}
              <span style={{
                display: 'block',
                alignItems: 'center',
                color: '#ffffffcc',
                fontWeight: '300',
                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              }}>
                <CheckIcon style={{
                  marginRight: currentLanguage === 'ar' ? '-3px' : '5px',
                  position: 'relative',
                  top: '5px',
                  color: '#1A73E8',
                }} />
                {t('30 done this month')}
              </span>
            </Typography>
            <MoreVertIcon sx={{
              position: 'relative',
              right: '60px',
              color: 'white',


            }} />
          </div>

          <ReactVirtualizedTable />

        </div>
      </div>
      <div
        style={{
          minHeight: '480px',
          width: '90%',
          maxWidth: '295px',
          background: '#202940',
          borderRadius: '0.75rem',
          boxShadow: '0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2), 0rem 0.0625rem 0.3125rem 0rem rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          margin: 'auto',
          padding: '20px',
          position: 'relative',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          color: 'white',
        }}
      >
        <Typography
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            lineHeight: '20px',
            fontSize: '15px',
            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
          }}
        >
          {t('Orders overview')}
          <span
            style={{
              display: 'block',
              alignItems: 'center',
              color: '#ffffffcc',
              fontWeight: '300',
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
            }}
          >
            <ArrowUpwardIcon
              style={{
                marginRight: currentLanguage === 'ar' ? '-5px' : '5px',
                position: 'relative',
                top: '5px',
                color: '#4CAF50',
              }}
            />
            {t('24% this month')}
          </span>
        </Typography>

        <div style={{ marginTop: '30px', position: 'relative', alignItems: 'center' }}>
          <div
            style={{
              height: '300px',
              width: '1px',
              background: '#ffffffcc',
              margin: '0 auto',

            }}
          >
            {[
              {
                icon: <NotificationsRoundedIcon sx={{ fontSize: '1rem', color: '#ffffff' }} />,
                background: '#4CAF50',
                title: t('$2400, Design changes'),
                date: t('22 DEC 7:20 PM'),
                top: '1%',

              },
              {
                icon: <InventoryIcon sx={{ fontSize: '1rem', color: '#ffffff' }} />,
                background: '#F44335',
                title: t('New order #1832412'),
                date: t('21 DEC 11 PM'),
                top: '24%',
              },
              {
                icon: <InventoryIcon sx={{ fontSize: '1rem', color: '#ffffff' }} />,
                background: '#1A73E8',
                title: t('Server payments for April'),
                date: t('21 DEC 9:34 PM'),
                top: '47%',
              },
              {
                icon: <InventoryIcon sx={{ fontSize: '1rem', color: '#ffffff' }} />,
                background: '#fb8c00',
                title: t('New card added for #4395133'),
                date: t('21 APR 9:34 PM'),
                top: '70%',
              },
              {
                icon: <InventoryIcon sx={{ fontSize: '1rem', color: '#ffffff' }} />,
                background: '#e91e63',
                title: t('New card added for #4395133'),
                date: t('21 APR 9:34 PM'),
                top: '93%',
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: item.top,
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    background: item.background,
                    color: '#ffffff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '10px', // Add margin to the right of the icon
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ whiteSpace: 'nowrap' }}>
                  <Typography
                    sx={{
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                    }}
                  >
                    {item.title}
                    <span
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '200',
                        opacity: '0.7',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                      }}
                    >
                      {item.date}
                    </span>
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>

    </div>

    
  )
}

export default Dashboardcontent
