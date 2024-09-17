import React from "react";
import DateInput from "./DateInput";
import { useData } from "../Context/DataContext";

const DateRange = () => {
  const { inicio, setInicio } = useData();
  const { final, setFinal } = useData();

  return (
    <form className="flex box" onSubmit={(e) => e.preventDefault()}>
      <DateInput
        label="Início"
        value={inicio}
        onChange={({ target }) => {
          setInicio(target.value);
        }}
      />
      <DateInput
        label="Final"
        value={final}
        onChange={({ target }) => {
          setFinal(target.value);
        }}
      />
    </form>
  );
};

export default DateRange;
