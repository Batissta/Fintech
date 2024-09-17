import React from "react";
import { IVenda } from "../Context/DataContext";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const dadosGrafico = [
  { data: "2023-05-03", pago: 30000, processando: 82832, falha: 12023 },
  { data: "2023-05-04", pago: 340000, processando: 23993, falha: 70388 },
  { data: "2023-05-06", pago: 34000, processando: 50003, falha: 500388 },
];

type VendaDia = {
  data: string;
  pago: number;
  processando: number;
  falha: number;
};

const transformData = (data: IVenda[]): VendaDia[] => {
  const dias = data.reduce((acc: { [key: string]: VendaDia }, el) => {
    const dia = el.data.split(" ")[0];
    if (!acc[dia]) {
      acc[dia] = {
        data: dia,
        pago: 0,
        falha: 0,
        processando: 0,
      };
    }
    acc[dia][el.status] += el.preco;
    return acc;
  }, {});

  return Object.values(dias).map((dia)=> ({
    ...dia,
    data: dia.data.substring(5)
  }));
};

const GraficoVendas = ({ data }: { data: IVenda[] }) => {
  const tranformedData = transformData(data);
  return (
    <ResponsiveContainer height={400} width="99%">
      <LineChart
        width={400}
        height={400}
        data={tranformedData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pago" stroke="#A36AF9" strokeWidth={3} />
        <Line
          type="monotone"
          dataKey="processando"
          stroke="#FBCB21"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="falha"
          stroke="#000000"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraficoVendas;
