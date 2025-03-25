import React from 'react';
import Profilecontent from './Profilecontent';

function ContainerTest() {
  return (
    <div
      style={{
        border: '2px solid red',
        height: '100vh',
        marginLeft: '259px',  // Ensures space for the sidebar
        padding: '0 16px',    // Adds padding inside the container
        width: 'calc(100% - 259px)',  // Adjusted width based on sidebar
        maxWidth: '1920px',   // Max width set to 1920px
        boxSizing: 'border-box',
        display: 'flex',      // Enables flexbox layout
        overflow : 'auto',
        justifyContent: 'center',  // Centers horizontally
        
      }}
    >
      
     
     
    </div>
  );
}

export default ContainerTest;
