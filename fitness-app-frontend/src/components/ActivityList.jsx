import { Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getActivities } from '../services/api'

const ActivityList = ({ refresh }) => {
  const [activities, setActivities] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getActivities().then(res => setActivities(res.data))
  }, [refresh])

  return (
    <Grid container spacing={2}>
      {activities.map(activity => (
        <Grid item xs={12} key={activity.id}>
          <Card onClick={() => navigate(`/activities/${activity.id}`)}>
            <CardContent>
              <Typography variant="h6">{activity.type}</Typography>
              <Typography>Duration: {activity.duration}</Typography>
              <Typography>Calories: {activity.caloriesBurned}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ActivityList
