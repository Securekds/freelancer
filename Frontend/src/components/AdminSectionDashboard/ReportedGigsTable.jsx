import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const reportedGigs = [
  { id: 1, title: "Fake Gig", category: "Design", subcategory: "Logo", postedBy: "Spam User", reportReason: "Scam", reportDate: "2024-03-20" },
  { id: 2, title: "Illegal Service", category: "Writing", subcategory: "Essay", postedBy: "Alice", reportReason: "Against Terms", reportDate: "2024-03-18" }
];

const ReportedGigsTable = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Detect small screens

  const handleDelete = (id) => {
    console.log(`Deleting gig with ID: ${id}`);
    // Add API request to delete gig
  };

  const handleIgnore = (id) => {
    console.log(`Ignoring report for gig with ID: ${id}`);
    // Add API request to mark the gig as not reported
  };

  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto", width: "100%" ,
        background: 'rgba(0, 0, 0, 0.2)',
        marginBottom : '20px',

    }}>
      <Table size={isSmallScreen ? "small" : "medium"}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" , color: 'white'  }}>Gig Title</TableCell>
            <TableCell sx={{ fontWeight: "bold" , color: 'white'  }}>Category</TableCell>
            <TableCell sx={{ fontWeight: "bold" , color: 'white'  }}>Subcategory</TableCell>
            <TableCell sx={{ fontWeight: "bold" , color: 'white'  }}>Posted By</TableCell>
            <TableCell sx={{ fontWeight: "bold",  color: 'white'  }}>Report Reason</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: 'white'  }}>Report Date</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: 'white'  }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportedGigs.map((gig) => (
            <TableRow key={gig.id}>
              <TableCell sx={{ fontWeight: "bold" , color: 'white'  }}>{gig.title}</TableCell>
              <TableCell sx={{ fontWeight: "bold" , color: 'white'  }}>{gig.category}</TableCell>
              <TableCell sx={{ fontWeight: "bold" , color: 'white'  }}>{gig.subcategory}</TableCell>
              <TableCell sx={{ fontWeight: "bold" , color: 'white'  }}>{gig.postedBy}</TableCell>
              <TableCell sx={{ fontWeight: "bold" , color: 'white'  }}>{gig.reportReason}</TableCell>
              <TableCell sx={{ fontWeight: "bold" , color: 'white'  }}>{gig.reportDate}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ marginRight: 1 }}
                  onClick={() => handleDelete(gig.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleIgnore(gig.id)}
                >
                  Ignore
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportedGigsTable;
