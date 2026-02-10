import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

const ActivityList = ({ refresh }) => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/activities").then((res) => {
      setActivities(res.data);
    });
  }, [refresh]);

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 5, md: 10 },   // 👈 LEFT–RIGHT PADDING
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: "black",
          letterSpacing: "0.4px",
          mb: 3,
          
        }}
      >
        {/* 🗂 Activity History */}
      </Typography>

      <Grid container spacing={4}>
        {[...activities]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((a) => (
            <Grid item xs={12} key={a.id}>
              {/* 👆 full width card, no side-by-side */}
              <Card
                onClick={() => navigate(`/activities/${a.id}`)}
                sx={{
                  borderRadius: 4,
                  cursor: "pointer",
                  background:
                    "linear-gradient(135deg,#43cea2,#185a9d)",
                  color: "white",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.35)",
                  },
                }}
              >
                <CardContent sx={{ px: 4, py: 3 }}>
                  {/* 👆 CARD INTERNAL PADDING */}
                  <Typography variant="h6" fontWeight={700}>
                    {a.type}
                  </Typography>

                  <Typography mt={1}>
                    ⏱ {a.duration} min
                  </Typography>

                  <Typography>
                    🔥 {a.caloriesBurned} kcal
                  </Typography>

                  <Typography
                    mt={2}
                    fontSize={13}
                    sx={{ opacity: 0.85 }}
                  >
                    View AI Recommendation →
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ActivityList;
