import React, { SetStateAction } from "react";
import useFetch from "../Hooks/useFetch.tsx";

export interface IVenda {
  id: string;
  nome: string;
  preco: number;
  status: "processando" | "pago" | "falha";
  pagamento: "boleto" | "pix" | "cartao";
  data: string;
  parcelas: number | null;
}

interface IDataContext {
  inicio: string;
  setInicio: React.Dispatch<React.SetStateAction<string>>;
  final: string;
  setFinal: React.Dispatch<SetStateAction<string>>;
  data: IVenda[] | null;
  error: string | null;
  loading: boolean;
}

const DataContext = React.createContext<IDataContext | null>(null);

export const useData = () => {
  const context = React.useContext(DataContext);
  if (!context)
    throw new Error("useData deve estar dentro de ContextProvider.");
  return context;
};

const getNDaysAgo = (n: number) => {
  const data = new Date();
  data.setDate(data.getDate() - n);
  const dd = String(data.getDate()).padStart(2, "0");
  const mm = String(data.getMonth() + 1).padStart(2, "0");
  const yyyy = String(data.getFullYear());
  return `${yyyy}-${mm}-${dd}`;
};

export const DataContextProvider = ({ children }: React.PropsWithChildren) => {
  const [inicio, setInicio] = React.useState(getNDaysAgo(30));
  const [final, setFinal] = React.useState(getNDaysAgo(0));
  const { data, error, loading } = useFetch<IVenda[]>(
    `https://data.origamid.dev/vendas/?inicio=${inicio}&final=${final}`
  );
  return (
    <DataContext.Provider
      value={{ inicio, setInicio, final, setFinal, data, loading, error }}
    >
      {children}
    </DataContext.Provider>
  );
};
