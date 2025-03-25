import React from 'react'
import Section from "./Section";

function BlackHole() {
  return (
    <Section className='border' >
  <div className=""
      style={{
     
       
        
      }}
      >
        <video
          autoPlay
          muted
          loop
         
          style={{
         
            margin: "auto",
        
            
          }}
        >
          <source src="/src/assets/images/small-logos/blackhole.webm" type="video/webm" />
        </video>
      </div>
    </Section>
  )
}

export default BlackHole
