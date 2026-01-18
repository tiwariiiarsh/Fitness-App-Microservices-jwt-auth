import { Box, Button } from "@mui/material";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { setCredentials } from "./slice/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";

const ActivityPage = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid grey",
        borderRadius: 2,
        maxWidth: 400,
        margin: "20px auto",
      }}
    >
      <ActivityForm onActivitiesAdded={() => setRefresh(!refresh)} />
      <ActivityList refresh={refresh} />
    </Box>
  );
};


function App() {
  const { token, tokenData, logIn } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
  if (token && tokenData) {
    const userId = tokenData.sub; // ✅ Keycloak user UUID

    dispatch(
      setCredentials({
        token,
        user: tokenData,
        userId,   // 🔥 VERY IMPORTANT
      })
    );
  }
}, [token, tokenData, dispatch]);


  if (!token) {
    return (
      <Button variant="contained" onClick={logIn}>
        Login
      </Button>
    );
  }

  return (
    <BrowserRouter>
      <Box
        component="section"
        sx={{
          p: 1,
          border: "1px dotted black",
          borderRadius: 1,
          width: "100%",
        }}
      >
        <h1>Fitness App</h1>

        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<ActivityPage />} />
          <Route path="/activities/:id" element={<ActivityPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
