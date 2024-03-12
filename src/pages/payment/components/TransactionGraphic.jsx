import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SAMPLE_DATA = [
  {
    name: "Januari",
    income: 4000,
    outcome: 2400,
  },
  {
    name: "Febuari",
    income: 3000,
    outcome: 1398,
  },
  {
    name: "Maret",
    income: 2000,
    outcome: 9800,
  },
  {
    name: "April",
    income: 2780,
    outcome: 3908,
  },
  {
    name: "Mei",
    income: 1890,
    outcome: 4800,
  },
  {
    name: "Juni",
    income: 2390,
    outcome: 3800,
  },
  {
    name: "Juli",
    income: 3490,
    outcome: 4300,
  },
];

const TransactionGraphic = () => {
  return (
    <LineChart
      width={1000}
      height={500}
      data={SAMPLE_DATA}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="outcome" stroke="#8884d8" />
      <Line type="monotone" dataKey="income" stroke="#82ca9d" />
    </LineChart>
  );
};
export default TransactionGraphic;