import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import LazyLoad from 'react-lazyload';
    
function EventTile({ event }) {
    const { image, title, description, date, time, location } = event;
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ maxWidth: 345 }}>
        <LazyLoad>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            height="140" // Adjust image height as needed
          />
        </LazyLoad>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ fontWeight: 'bold' }}>Date:</span> {date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ fontWeight: 'bold' }}>Time:</span> {time}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ fontWeight: 'bold' }}>Location:</span> {location}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default EventTile;