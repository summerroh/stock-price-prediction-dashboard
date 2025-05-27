import { styled } from "@mui/material";
import Chart from "react-apexcharts";

export const StyledChart = styled(Chart)(({ theme }) => ({
  minHeight: "250px !important",
  "& .apexcharts-tooltip *": {
    fontWeight: 500,
    fontFamily: theme.typography.fontFamily,
  },
  "& .apexcharts-tooltip": {
    boxShadow: "none",
    alignItems: "center",
    border: `1px solid ${theme.palette.primary[100]}`,
  },
  "& .apexcharts-tooltip.apexcharts-theme-light": {
    border: `1px solid ${theme.palette.primary[100]}`,
  },
  "& .apexcharts-tooltip-text-y-value": {
    fontWeight: 700,
  },
  "& .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center": {
    justifyContent: "space-evenly",
  },
  "& .apexcharts-legend-marker": {
    borderRadius: "50% !important",
    marginRight: 5,
  },
}));
