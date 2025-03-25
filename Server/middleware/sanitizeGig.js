export const sanitizeGigData = (req, res, next) => {
  const sanitizedData = {
    ...req.body,
    projectTitle: req.body.projectTitle?.trim(),
    projectDescription: req.body.projectDescription?.trim(),
    selectedCategory: req.body.selectedCategory?.trim(),
    selectedSubCategory: req.body.selectedSubCategory?.trim(),
  };

  // Parse JSON fields
  sanitizedData.selectedSkills =
    typeof req.body.selectedSkills === "string"
      ? JSON.parse(req.body.selectedSkills)
      : req.body.selectedSkills;

  sanitizedData.projectLinks =
    typeof req.body.projectLinks === "string"
      ? JSON.parse(req.body.projectLinks)
      : req.body.projectLinks || [];

  req.body = sanitizedData;
  next();
};
