import Badge from "@/components/atoms/Badge";

const RoleIndicator = ({ role }) => {
  const roleConfig = {
    jobseeker: { variant: "jobseeker", label: "Job Seeker" },
    employer: { variant: "employer", label: "Employer" },
    admin: { variant: "admin", label: "Admin" },
  };

  const config = roleConfig[role] || { variant: "default", label: role };

  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default RoleIndicator;