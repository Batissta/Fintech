import React from "react";
import { IVenda } from "../Context/DataContext";
import { Link } from "react-router-dom";

const VendaItem = ({ venda }: { venda: IVenda }) => {
  return (
    <div className="venda box">
      <Link to={`/vendas/${venda.id}`} style={{ fontFamily: "monospace" }}>
        {venda.id}
      </Link>
      <div>{venda.nome}</div>
      <div>
        {venda.preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </div>
    </div>
  );
};

export default VendaItem;
