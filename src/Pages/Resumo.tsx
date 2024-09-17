import React from "react";
import { useData } from "../Context/DataContext";
import GraficoVendas from "../Components/GraficoVendas";

const Resumo = () => {
  const { data } = useData();
  if (!data) return null;
  return (
    <section>
      <div className="resumo flex mb">
        <div className="box">
          <h2>Vendas</h2>
          <span>
            {data
              .filter((el) => el.status !== "falha")
              .reduce((acc, el) => acc + el.preco, 0)
              .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </span>
        </div>
        <div className="box">
          <h2>Recebido</h2>
          <span>
            {data
              .filter((el) => el.status === "pago")
              .reduce((acc, el) => acc + el.preco, 0)
              .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </span>
        </div>
        <div className="box">
          <h2>Processando</h2>
          <span>
            {data
              .filter((el) => el.status === "processando")
              .reduce((acc, el) => acc + el.preco, 0)
              .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </span>
        </div>
      </div>
      <div className="box mb">
        <GraficoVendas data={data}/>
      </div>
    </section>
  );
};

export default Resumo;
