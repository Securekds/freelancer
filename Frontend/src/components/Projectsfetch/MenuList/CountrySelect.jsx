// CountrySelect.js
import React from 'react';
import Select from 'react-select';
import Flag from 'react-world-flags';

const countryOptions = [
  { value: '+213', label: <Flag code="DZ" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+20', label: <Flag code="EG" style={{ width: 20, height: 15, marginRight: 8 }} /> }, // Egypt
  { value: '+961', label: <Flag code="LB" style={{ width: 20, height: 15, marginRight: 8 }} /> }, // Lebanon
  { value: '+962', label: <Flag code="JO" style={{ width: 20, height: 15, marginRight: 8 }} /> }, // Jordan
  { value: '+965', label: <Flag code="KW" style={{ width: 20, height: 15, marginRight: 8 }} /> }, // Kuwait
  { value: '+974', label: <Flag code="QA" style={{ width: 20, height: 15, marginRight: 8 }} /> }, // Qatar
  { value: '+968', label: <Flag code="OM" style={{ width: 20, height: 15, marginRight: 8 }} /> }, // Oman
  { value: '+971', label: <Flag code="AE" style={{ width: 20, height: 15, marginRight: 8 }} /> }, // United Arab Emirates
  { value: '+967', label: <Flag code="YE" style={{ width: 20, height: 15, marginRight: 8 }} /> }, // Yemen
  { value: '+64', label: <Flag code="MA" style={{ width: 20, height: 15, marginRight: 8 }} /> }, // Morocco
  { value: '+253', label: <Flag code="DJ" style={{ width: 20, height: 15, marginRight: 8 }} /> }, // Djibouti
  { value: '+249', label: <Flag code="SD" style={{ width: 20, height: 15, marginRight: 8 }} /> }, // Sudan
  { value: '+218', label: <Flag code="LY" style={{ width: 20, height: 15, marginRight: 8 }} /> }, // Libya
  { value: '+1', label: <Flag code="US" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+44', label: <Flag code="GB" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+33', label: <Flag code="FR" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+49', label: <Flag code="DE" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+39', label: <Flag code="IT" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+34', label: <Flag code="ES" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+91', label: <Flag code="IN" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+81', label: <Flag code="JP" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+61', label: <Flag code="AU" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+55', label: <Flag code="BR" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+7', label: <Flag code="RU" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+27', label: <Flag code="ZA" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+46', label: <Flag code="SE" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+31', label: <Flag code="NL" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+52', label: <Flag code="MX" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+91', label: <Flag code="IN" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+20', label: <Flag code="EG" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+65', label: <Flag code="SG" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+82', label: <Flag code="KR" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+91', label: <Flag code="IN" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+92', label: <Flag code="PK" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+98', label: <Flag code="IR" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+90', label: <Flag code="TR" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+230', label: <Flag code="MU" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+41', label: <Flag code="CH" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+62', label: <Flag code="ID" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+60', label: <Flag code="MY" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+381', label: <Flag code="RS" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+356', label: <Flag code="MT" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+48', label: <Flag code="PL" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+886', label: <Flag code="TW" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  { value: '+380', label: <Flag code="UA" style={{ width: 20, height: 15, marginRight: 8 }} /> },
  // Add more countries here
];

const CountrySelect = ({ value, onChange, style }) => {
  // Find the currently selected option or default to Algeria
  const selectedOption = countryOptions.find(option => option.value === value) || countryOptions[0];

  return (
    <Select 
      options={countryOptions}
      value={selectedOption}
      onChange={(selectedOption) => {
        if (selectedOption) {
          // Update the input with the selected country code
          onChange(selectedOption.value);
        }
      }}
      styles={{
        container: (provided) => ({
          ...provided,
          width: '80px',
          flex: '0 1 auto',
          marginTop: '0px',
          marginRight: '-10px', // No margin on the right side
        }),
        control: (provided) => ({
          ...provided,
          backgroundColor: 'transparent', // Semi-transparent background
          borderColor: 'transparent', // No border on control
          boxShadow: 'none',
          '&:hover': {
            borderColor: 'transparent', // Ensures no border appears on hover
          },
       
         
        }),
        singleValue: (provided) => ({
          ...provided,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: '0 8px',
        }),
        indicatorSeparator: () => null, // Remove indicator separator
        menu: (provided) => ({
          ...provided,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        
          borderRadius: '4px', // Border radius for dropdown menu
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Shadow for dropdown menu
          backdropFilter: 'blur(900px)',
          display : 'flex',
         
          justifyContent : 'center',
          
          marginTop: '0', // Ensure no gap between select and menu
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? 'rgba(0, 0, 0, 0.5)' : 'transparent', // Background color for each option
          color: 'white', // Text color for each option
          padding: '8px 16px', // Padding for each option
        }),
        menuList: (provided) => ({
          ...provided,
          maxHeight: '200px', // Maximum height of the dropdown menu
          overflowY: 'auto', // Enable vertical scrolling if needed
        }),
      }}
      {...style} // Apply additional styles from parent
    />
  );
};

export default CountrySelect;
