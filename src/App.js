import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardMedia,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { format } from "date-fns";
import { StyledChart } from "./components/StyledChart";
import { chartLineOptions, chartBarOptions } from "./components/chart-options";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [data, setData] = useState(null);
  const [selectedModel, setSelectedModel] = useState("CNN_new");
  const [selectedTicker, setSelectedTicker] = useState(0);
  const [metrics, setMetrics] = useState([]);
  const [modelImage, setModelImage] = useState(null);

  useEffect(() => {
    fetch("/all_model_results_FIXED.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        calculateMetrics(jsonData);
      });
  }, []);

  useEffect(() => {
    const img = new Image();
    if (isMobile) {
      img.src = `/model_structures/svg/${selectedModel}_structure.svg`;
    } else {
      img.src = `/model_structures/svg/${selectedModel}_structure_horizontal.svg`;
    }
    img.onload = () => setModelImage(img.src);
    img.onerror = () => {
      img.src = `/model_structures/${selectedModel}_structure.png`;
      img.onload = () => setModelImage(img.src);
      img.onerror = () => setModelImage(null);
    };
  }, [selectedModel, isMobile]);

  const calculateMetrics = (jsonData) => {
    const tickerNames = ["AAPL", "MSFT", "GOOG"];
    const modelOrder = [
      "CNN_new",
      "LSTM",
      "simple_hypergraph_model",
      "hypergraph_lstm",
    ];
    const metricsData = modelOrder
      .filter((model) => jsonData[model]) // Only include models that exist in the data
      .map((model) => {
        const modelData = jsonData[model];
        const actual = modelData.actual_prices.map(
          (prices) => prices[selectedTicker]
        );
        const predicted = modelData.predicted_prices.map(
          (prices) => prices[selectedTicker]
        );

        const mse =
          actual.reduce(
            (sum, val, idx) => sum + Math.pow(val - predicted[idx], 2),
            0
          ) / actual.length;
        const rmse = Math.sqrt(mse);
        const mae =
          actual.reduce(
            (sum, val, idx) => sum + Math.abs(val - predicted[idx]),
            0
          ) / actual.length;

        return {
          model,
          mse,
          rmse,
          mae,
        };
      });
    setMetrics(metricsData);
  };

  if (!data) return <div>Loading...</div>;

  const modelData = data[selectedModel];
  const chartData = modelData.dates.map((date, index) => ({
    date: format(new Date(date), "MMM dd, yyyy"),
    actual: modelData.actual_prices[index][selectedTicker],
    predicted: modelData.predicted_prices[index][selectedTicker],
  }));

  const tickerNames = ["AAPL", "MSFT", "GOOG"];

  const priceChartSeries = [
    {
      name: "Actual",
      data: chartData.map((item) => item.actual),
    },
    {
      name: "Predicted",
      data: chartData.map((item) => item.predicted),
    },
  ];

  const metricsChartSeries = [
    {
      name: "MSE",
      data: metrics.map((item) => item.mse),
    },
    {
      name: "RMSE",
      data: metrics.map((item) => item.rmse),
    },
    {
      name: "MAE",
      data: metrics.map((item) => item.mae),
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 4,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 6 }, mx: "auto" }}>
        <Paper
          elevation={4}
          sx={{
            bgcolor: "transparent",
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            mb: { xs: 0, md: 5 },
            boxShadow: "none",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.5rem", md: "2.8rem" },
              letterSpacing: 1,
              color: "#fff",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
              position: "relative",
              zIndex: 1,
              "&:after": {
                content: '""',
                display: "block",
                width: "120px",
                height: "6px",
                borderRadius: "3px",
                margin: "16px auto 0",
                opacity: 0.85,
              },
            }}
          >
            <span role="img" aria-label="chart">
              📈
            </span>{" "}
            Stock Price Prediction Model Dashboard
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontWeight: 400,
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Macquarie University Summer Internship Project
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {/* Selection (left) */}
          <Grid item xs={12} md={3}>
            <Paper
              sx={{
                p: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <FormControl fullWidth>
                <InputLabel>Model</InputLabel>
                <Select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                  {[
                    "CNN_new",
                    "LSTM",
                    "simple_hypergraph_model",
                    "hypergraph_lstm",
                  ]
                    .filter((model) => data[model]) // Only show models that exist in the data
                    .map((model) => (
                      <MenuItem key={model} value={model}>
                        {model}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Ticker</InputLabel>
                <Select
                  value={selectedTicker}
                  onChange={(e) => setSelectedTicker(e.target.value)}
                >
                  {tickerNames.map((ticker, index) => (
                    <MenuItem key={ticker} value={index}>
                      {ticker}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </Grid>

          {/* Model Structure (right) */}
          <Grid item xs={12} md={9}>
            <Paper
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "primary.main", alignSelf: "flex-start", mb: 2 }}
              >
                {selectedModel} Model Structure
              </Typography>
              {modelImage && (
                <>
                  <Box
                    sx={{
                      width: "100%",
                      display: "block",
                    }}
                  >
                    <Box
                      component="img"
                      src={modelImage}
                      alt={`${selectedModel} structure`}
                      sx={{
                        width: "100%",
                        height: "auto",
                        maxHeight: 500,
                        objectFit: "contain",
                        display: "block",
                        mx: "auto",
                        maxWidth: "100%",
                      }}
                    />
                  </Box>
                </>
              )}
            </Paper>
          </Grid>

          {/* Price Predictions - full width below */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "primary.main" }}
              >
                Price Predictions
              </Typography>
              <StyledChart
                type="line"
                options={chartLineOptions(
                  theme,
                  chartData.map((item) => item.date)
                )}
                series={priceChartSeries}
                height={400}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "primary.main" }}
              >
                Model Comparison Metrics
              </Typography>
              <StyledChart
                type="bar"
                options={chartBarOptions(
                  theme,
                  metrics.map((item) => item.model)
                )}
                series={metricsChartSeries}
                height={400}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "primary.main" }}
              >
                Metrics Table
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "primary.main" }}>
                        Model
                      </TableCell>
                      <TableCell align="right" sx={{ color: "primary.main" }}>
                        MSE
                      </TableCell>
                      <TableCell align="right" sx={{ color: "primary.main" }}>
                        RMSE
                      </TableCell>
                      <TableCell align="right" sx={{ color: "primary.main" }}>
                        MAE
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {metrics.map((row) => (
                      <TableRow key={row.model}>
                        <TableCell>{row.model}</TableCell>
                        <TableCell align="right">
                          {row.mse.toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {row.rmse.toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {row.mae.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
