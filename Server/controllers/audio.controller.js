// audio.controller.js
export const uploadAudio = (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }
  
    // Return full URL from backend
    const audioUrl = `${process.env.BACKEND_URL}/uploads/audio/${req.file.filename}`;
    res.status(200).json({ audioUrl });
  };