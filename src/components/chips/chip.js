import React from 'react';
import { Chip } from '@mui/material';

export default function TableChip({ children }) {
  const capitalizeFirstLetter = (string) => {
    const capitalizedStatus =
      string && typeof string === 'string' && string.length > 0 ? string.charAt(0).toUpperCase() + string.slice(1) : '';
    return capitalizedStatus;
  };

  if (!children) {
    return null;
  }

  const toUpperCaseStatus = capitalizeFirstLetter(children);
  return toUpperCaseStatus === 'Cancel' ? (
    <Chip label={toUpperCaseStatus} sx={{ backgroundColor: '#ED5E68', color: '#fff', borderRadius: 1 }} />
  ) : toUpperCaseStatus === 'Waiting' ? (
    <Chip label={toUpperCaseStatus} sx={{ backgroundColor: '#ffc107', color: '#fff', borderRadius: 1 }} />
  ) : toUpperCaseStatus === 'Pending' ? (
    <Chip label={toUpperCaseStatus} sx={{ backgroundColor: '#F29339', color: '#fff', borderRadius: 1 }} />
  ) : toUpperCaseStatus === 'Active' ? (
    <Chip label={toUpperCaseStatus} sx={{ backgroundColor: '#6AA84F', color: '#fff', borderRadius: 1 }} />
  ) : (
    <Chip label={toUpperCaseStatus} sx={{ backgroundColor: '#4EA20F', color: '#fff', borderRadius: 1 }} />
  );
}
