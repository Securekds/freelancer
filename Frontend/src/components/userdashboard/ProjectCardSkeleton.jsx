import { Box, Skeleton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';


const ProjectCardSkeleton = () => {
       const isSmallScreen = useMediaQuery('(max-width:600px)');
          const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
          const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
          const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

  return (
    <Box
      sx={{
        border: '1px solid grey',
        borderRadius: '10px',
        width: isSmallScreen? '90%' : '40%',
        height: 'auto',
        padding: '20px',
        gap: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        background: 'grey',
      }}
    >
      {/* Card Header Skeleton */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '10px',
        }}
      >
        <Skeleton variant="text" width="60%" height={30} />
      </Box>

      {/* Status Badge Skeleton */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Skeleton variant="rectangular" width="40%" height={32} sx={{ borderRadius: '16px' }} />
      </Box>

      {/* Card Details Skeleton */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginTop: '20px',
        }}
      >
        {/* First Column */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
        </Box>

        {/* Second Column */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
        </Box>
      </Box>

      {/* Card Footer Skeleton */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
          gap: '10px',
        }}
      >
        <Skeleton variant="text" width="50%" height={20} />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            gap: '10px',
            padding: '0 10px',
          }}
        >
          {/* Seller Profile Skeleton */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <Skeleton variant="circular" width={35} height={35} />
            <Skeleton variant="text" width="80%" height={20} />
          </Box>

          {/* Buyer Profile Skeleton */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <Skeleton variant="circular" width={35} height={35} />
            <Skeleton variant="text" width="80%" height={20} />
          </Box>
        </Box>
      </Box>

      {/* Additional Buttons or Messages Skeleton */}
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: '8px' }} />
      </Box>
    </Box>
  );
};

export default ProjectCardSkeleton;