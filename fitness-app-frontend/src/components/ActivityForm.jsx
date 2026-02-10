import {
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import api from "../services/api";

const ActivityForm = ({ onActivitiesAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/activities", activity); // ✅ FIX HERE

    onActivitiesAdded?.(); // safe call
    setActivity({ type: "RUNNING", duration: "", caloriesBurned: "" });
  };

  return (
    <Card sx={{ borderRadius: 4, marginBottom: 10 }}>
      <CardContent>
        <Typography variant="h4" fontWeight={700} mb={2}>
          ➕ Add Activity
        </Typography>

        <Select
          fullWidth
          value={activity.type}
          sx={{ mb: 2, bgcolor: "white" }}
          onChange={(e) =>
            setActivity({ ...activity, type: e.target.value })
          }
        >
          {["RUNNING","WALKING","CYCLING","GYM","YOGA","HIIT"].map((a) => (
            <MenuItem key={a} value={a}>{a}</MenuItem>
          ))}
        </Select>

        <TextField
          fullWidth
          label="Duration (min)"
          type="number"
          sx={{ mb: 2, bgcolor: "white" }}
          value={activity.duration}
          onChange={(e) =>
            setActivity({ ...activity, duration: e.target.value })
          }
        />

        <TextField
          fullWidth
          label="Calories"
          type="number"
          sx={{ mb: 3, bgcolor: "white" }}
          value={activity.caloriesBurned}
          onChange={(e) =>
            setActivity({ ...activity, caloriesBurned: e.target.value })
          }
        />

        <Button fullWidth variant="contained" onClick={handleSubmit}>
          Save Activity
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActivityForm;
