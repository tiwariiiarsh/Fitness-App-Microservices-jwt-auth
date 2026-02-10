import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getActivityDetail } from "../services/api";

const Section = ({ title, items }) => (
  <>
    <Typography variant="h6" mt={2}>{title}</Typography>
    {items?.map((item, i) => (
      <Typography key={i} sx={{ ml: 2 }}>• {item}</Typography>
    ))}
    <Divider sx={{ my: 2 }} />
  </>
);

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    getActivityDetail(id).then(res => setActivity(res.data));
  }, [id]);

  if (!activity) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5 }}>
      <Card elevation={10}>
        <CardContent>
          <Typography variant="h4" fontWeight={800}>
            🧠 AI Activity Report
          </Typography>

          <Typography>🏃 {activity.type}</Typography>
          <Typography>⏱ {activity.duration} min</Typography>
          <Typography>🔥 {activity.caloriesBurned} kcal</Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5">📊 Analysis</Typography>
          <Typography>{activity.recommendation}</Typography>

          <Section title="🚀 Improvements" items={activity.improvements} />
          <Section title="💡 Suggestions" items={activity.suggestions} />
          <Section title="⚠ Safety Tips" items={activity.safety} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActivityDetail;
