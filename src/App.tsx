import React from "react";
import Sidenav from "./Components/Sidenav.tsx";
import Header from "./Components/Header.tsx";
import Resumo from "./Pages/Resumo.tsx";
import { DataContextProvider } from "./Context/DataContext.tsx";
import Vendas from "./Pages/Vendas.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Venda from "./Pages/Venda.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <DataContextProvider>
        <div className="container">
          <Sidenav />
          <main>
            <Header />
            <Routes>
              <Route path="/" element={<Resumo />} />
              <Route path="/vendas" element={<Vendas />} />
              <Route path="/vendas/:id" element={<Venda />} />
              
            </Routes>
          </main>
        </div>
      </DataContextProvider>
    </BrowserRouter>
  );
};

export default App;
