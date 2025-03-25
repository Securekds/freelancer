import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const ProfileStarRating = ({ rating, starcolorfilled = "#FFDF00", starcolorempty = "#E2E8F0", fontsize = "14px" }) => {
  const fullStars = Math.floor(rating); // Count full stars
  const hasHalfStar = rating % 1 !== 0; // Check if we need a half star
  const totalStars = 5; // Total stars

  return (
    <div className="flex items-center space-x-1">
      {[...Array(totalStars)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={
            index < fullStars
              ? faStar // Full star
              : index === fullStars && hasHalfStar
              ? faStarHalfAlt // Half star
              : faStar // Empty star
          }
          size="sm"
          style={{
            color: index < fullStars || (index === fullStars && hasHalfStar) ? starcolorfilled : starcolorempty,
            fontSize: fontsize,
          }}
        />
      ))}
      <span className="text-gray-600 text-sm ml-1"> {rating}/5</span>
    </div>
  );
};

export default ProfileStarRating;
