import React from 'react';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import "../css/PageStatus.css";


export default function PageStatus(props) {
  return (
    <div role="presentation" id="presentation">
      <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to={props.pageLink}>
          {props.MainHeading}
        </Link>
               <Typography color="text.primary">{props.currentPage}</Typography>
      </Breadcrumbs>
    </div>
  );
}
