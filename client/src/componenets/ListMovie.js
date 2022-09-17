import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'




function ListMovie({movie,title,vote_average,overview}) {
  
  const API_IMAGE="https://image.tmdb.org/t/p/w500/"
  return (
    
    <div className='card'>
     
      <div className='poster'>
     <Box p={2}>
      <Grid item container spacing = {1}>
      <Card sx={{ maxWidth: 345 }}>
        
     
      <CardMedia className='movie-img'
       
        component="img"
        height="190"
        image={movie.poster_path ? API_IMAGE+movie.poster_path : "https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"}
        alt="poster image"
      />
      
        <Typography gutterBottom variant="h4" component="div" className='title'>
          {movie.title}
          
        </Typography>
       
        <Typography variant="body2" color="text.secondary" className='over-view'>
         {movie.overview},{movie.vote_average}
        </Typography>
        
        <Typography variant="h6" color="text.primary" backgroundcolor="red" className='rating'>
         Rating: {movie.vote_average}
        </Typography>
       
        
      
      
    </Card>
     </Grid>
    </Box>

        
      </div>
    </div>
  )
}

export default ListMovie