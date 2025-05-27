export const chartBarOptions = (theme, categories) => ({
  chart: {
    type: "bar",
    stacked: false,
    toolbar: { show: false },
    fontFamily: theme.typography.fontFamily,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      borderRadius: 4,
    },
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: categories,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        colors: theme.palette.text.secondary,
        fontSize: "13px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: theme.palette.text.secondary,
        fontSize: "13px",
      },
      formatter: (value) => `$${Math.round(value)}`,
    },
  },
  fill: {
    opacity: 1,
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0.2,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.8,
      stops: [0, 100],
    },
  },
  colors: [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
  ],
  dataLabels: { enabled: false },
  grid: {
    borderColor: theme.palette.divider,
    strokeDashArray: 3,
    xaxis: { lines: { show: true } },
  },
  tooltip: {
    theme: "light",
    y: {
      formatter: (value) => `$${value.toFixed(2)}`,
    },
  },
  legend: {
    position: "bottom",
    horizontalAlign: "center",
    fontSize: "13px",
    markers: { radius: 12 },
    itemMargin: { horizontal: 10 },
    labels: { colors: "#fff" },
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        plotOptions: {
          bar: {
            columnWidth: "70%",
          },
        },
      },
    },
  ],
});

export const chartLineOptions = (theme, categories) => ({
  chart: {
    type: "line",
    toolbar: { show: false },
    fontFamily: theme.typography.fontFamily,
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  xaxis: {
    categories: categories,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        colors: theme.palette.text.secondary,
        fontSize: "11.5px",
      },
      rotate: -45,
      rotateAlways: true,
      offsetY: 10,
    },
    tickAmount: Math.min(10, categories.length),
  },
  yaxis: {
    labels: {
      style: {
        colors: theme.palette.text.secondary,
        fontSize: "13px",
      },
      formatter: (value) => `$${Math.round(value)}`,
    },
  },
  colors: [theme.palette.primary.main, theme.palette.secondary.main],
  dataLabels: { enabled: false },
  grid: {
    borderColor: theme.palette.divider,
    strokeDashArray: 3,
    xaxis: { lines: { show: true } },
  },
  tooltip: {
    theme: "light",
    y: {
      formatter: (value) => `$${value.toFixed(2)}`,
    },
  },
  legend: {
    position: "bottom",
    horizontalAlign: "center",
    fontSize: "13px",
    markers: { radius: 12 },
    itemMargin: { horizontal: 10 },
    labels: { colors: "#fff" },
  },
  markers: {
    size: 0,
    hover: { size: 8 },
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        chart: { height: 300 },
      },
    },
  ],
});
