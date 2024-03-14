import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { STATIC_MONTH } from "../../../constant/global";

const mappingData = (data) => {
  return STATIC_MONTH.map((month) => {
    const incomeTotal = data.paymentIn
      .filter((transc) => transc.month === month.id)
      .reduce(
        (accumulator, current) =>
          accumulator + current.count * current.payment.fee,
        0
      );

    const outcomeTotal = data.paymentOut
      .filter((transc) => transc.month === month.id)
      .reduce(
        (accumulator, current) =>
          accumulator + current.count * current.payment.fee,
        0
      );
    return {
      name: month.label,
      income: incomeTotal,
      outcome: outcomeTotal,
    };
  });
};

const TransactionGraphic = ({ data }) => {
  const mappedData = mappingData(data);
  return (
    <LineChart
      width={1000}
      height={500}
      data={mappedData}
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
