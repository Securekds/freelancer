import React from 'react';
import { Toaster } from 'react-hot-toast';

const CustomToastContainer = () => {
    return (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
            <Toaster />
        </div>
    );
};

export default CustomToastContainer;
