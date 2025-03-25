import React, { useEffect, useState } from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    TableContainer,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    IconButton,
    Button,
    Modal,
    Box
} from "@mui/material";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AdminConversations = () => {
    const [projects, setProjects] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/server/get/projects`, { withCredentials: true });

                console.log("Fetched projects:", res.data);

                if (res.data.success) {
                    setProjects(res.data.projects || []);
                    console.log("🟢 Projects state after fetching:", res.data.projects);
                } else {
                    console.error("Failed to fetch projects:", res.data.message);
                }
            } catch (error) {
                console.error("❌ Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    const handleExpandClick = (projectId) => {
        setExpanded(expanded === projectId ? null : projectId);
    };

    const handleViewConversation = async (conversationId, buyerId, sellerId) => {
        setOpenModal(true);
        setSelectedConversation(conversationId);
        await fetchConversationMessages(conversationId, buyerId, sellerId);
    };

    const fetchConversationMessages = async (conversationId, buyerId, sellerId) => {
        try {
            // Fetch messages
            const messagesRes = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/server/get/conversations/${conversationId}`,
                { withCredentials: true }
            );
    
            // Fetch user details
            const [buyerRes, sellerRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/server/get/user/${buyerId}`, { withCredentials: true }),
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/server/get/user/${sellerId}`, { withCredentials: true })
            ]);
    
            if (messagesRes.data.success && buyerRes.data.success && sellerRes.data.success) {
                const messages = messagesRes.data.messages || [];
                const buyer = buyerRes.data.user;
                const seller = sellerRes.data.user;
    
                const messagesWithNames = messages.map(msg => ({
                    ...msg,
                    senderName: msg.senderId === buyerId 
                        ? `${buyer.firstName} ${buyer.lastName}` 
                        : `${seller.firstName} ${seller.lastName}`
                }));
    
                setMessages(messagesWithNames);
            } else {
                console.error("Failed to fetch data:", {
                    messages: messagesRes.data,
                    buyer: buyerRes.data,
                    seller: sellerRes.data
                });
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <TableContainer sx={{ overflowX: "auto", width: "96%", background: 'rgba(0, 0, 0, 0.2)', marginBottom: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold", color: 'white' }}></TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Project ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Buyer</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Seller</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Budget</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Conversation</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(projects) && projects.length > 0 ? (
                            projects.map((project) => (
                                <React.Fragment key={project._id}>
                                    <TableRow onClick={() => handleExpandClick(project._id)} sx={{ cursor: "pointer" }}>
                                        <TableCell>
                                            <IconButton>
                                                <ExpandMoreIcon sx={{ color: 'white', transform: expanded === project._id ? "rotate(180deg)" : "rotate(0deg)" }} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold", color: 'white' }}>{project._id}</TableCell>
                                        <TableCell sx={{ fontWeight: "bold", color: 'white' }}>
                                            {project.buyerId.firstName} {project.buyerId.lastName}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold", color: 'white' }}>
                                            {project.sellerId.firstName} {project.sellerId.lastName}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold", color: 'white' }}>{project.title}</TableCell>
                                        <TableCell sx={{ fontWeight: "bold", color: 'white' }}>${project.budget}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={project.status}
                                                color={
                                                    project.status === "Completed"
                                                        ? "success"
                                                        : project.status === "In Progress"
                                                            ? "warning"
                                                            : "error"
                                                }
                                            />
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold", color: 'white' }}>
                                            {project.conversationId}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold", color: 'white' }}>
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>

                                    {expanded === project._id && (
                                        <TableRow>
                                            <TableCell colSpan={9} sx={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                                                <Accordion expanded={true} sx={{ background: 'transparent', boxShadow: 'none' }}>
                                                    <AccordionSummary sx={{ display: "none" }} />
                                                    <AccordionDetails>
                                                        <Typography color="white"><strong>Last Price:</strong> {project.lastPrice}$</Typography>
                                                        <Typography color="white"><strong>Deadline:</strong> {new Date(project.deliveryTime).toLocaleDateString()}</Typography>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => handleViewConversation(project.conversationId, project.buyerId._id, project.sellerId._id)}
                                                            sx={{ marginTop: 2 }}
                                                        >
                                                            View Conversation
                                                        </Button>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ color: 'white' }}>
                                    No projects found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'black',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 3,
                    color: 'white'
                }}>
                    <Typography variant="h6">Conversation</Typography>
                    <Box sx={{ mt: 2, maxHeight: 300, overflowY: 'auto' }}>
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <Box key={index} sx={{ mb: 2 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        {msg.senderName}:
                                    </Typography>
                                    {msg.messageType === "text" && (
                                        <Typography variant="body2">{msg.text}</Typography>
                                    )}
                                    {msg.messageType === "audio" && (
                                        <audio src={msg.audioUrl} controls />
                                    )}
                                    {msg.messageType === "image" && (
                                        <img src={msg.imageUrl} alt="Sent Image" style={{ width: '100%', marginTop: 10 }} />
                                    )}
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2">No messages found.</Typography>
                        )}
                    </Box>
                    <Button onClick={() => setOpenModal(false)} sx={{ mt: 2 }} variant="contained">Close</Button>
                </Box>
            </Modal>
        </>
    );
};

export default AdminConversations;