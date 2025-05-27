# Stock Price Prediction Dashboard 📈

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/)
[![Recharts](https://img.shields.io/badge/Recharts-FF4088?style=for-the-badge&logo=recharts&logoColor=white)](https://recharts.org/)

A modern React-based dashboard for visualizing and comparing stock price prediction models. This dashboard provides an intuitive interface for analyzing and comparing different prediction models' performance across various stocks.

> This project was developed as part of the Summer Internship Program at Macquarie University, Sydney, Australia.

## 👨‍💻 Dashboard Builder

- **Sunkyoung Roh** - [GitHub](https://github.com/summerroh)

## ✨ Features

- 📊 Interactive model selection and comparison
- 🔍 Ticker selection (AAPL, MSFT, GOOG)
- 📈 Real-time price prediction visualization
- 📉 Model comparison metrics
- 📋 Detailed metrics table

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/summerroh/stock-price-prediction-dashboard.git
cd stock-price-prediction-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Build for production:

```bash
npm run build
```

## 📁 Data Structure

The dashboard expects a JSON file named `all_model_results_FIXED.json` in the public directory with the following structure:

```json
{
  "model_name": {
    "dates": ["2022-01-01", ...],
    "actual_prices": [[price1, price2, price3], ...],
    "predicted_prices": [[price1, price2, price3], ...]
  }
}
```

## 🛠️ Technologies Used

- [React](https://reactjs.org/) - Frontend framework
- [Material-UI](https://mui.com/) - UI component library
- [Recharts](https://recharts.org/) - Charting library
- [date-fns](https://date-fns.org/) - Date utility library

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/summerroh/stock-price-prediction-dashboard/issues).
