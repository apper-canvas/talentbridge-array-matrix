import Badge from "@/components/atoms/Badge";

const StatusPill = ({ status }) => {
  const statusConfig = {
    applied: { variant: "info", label: "Applied" },
    reviewing: { variant: "warning", label: "Under Review" },
    shortlisted: { variant: "success", label: "Shortlisted" },
    interviewing: { variant: "info", label: "Interviewing" },
    rejected: { variant: "error", label: "Rejected" },
    accepted: { variant: "success", label: "Accepted" },
    active: { variant: "success", label: "Active" },
    closed: { variant: "default", label: "Closed" },
    draft: { variant: "default", label: "Draft" },
    archived: { variant: "default", label: "Archived" },
    pending: { variant: "warning", label: "Pending" },
    suspended: { variant: "error", label: "Suspended" },
  };

  const config = statusConfig[status] || { variant: "default", label: status };

  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default StatusPill;