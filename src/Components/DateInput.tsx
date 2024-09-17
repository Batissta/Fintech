import React from "react";

const generalStyles: React.CSSProperties = {
  fontSize: "1rem",
  color: "var(--color-2)",
  padding: "var(--gap-s) 0.75rem",
  backgroundColor: "var(--color-4)",
  borderRadius: "var(--gap)",
};

const labelStyles: React.CSSProperties = {
  display: "block",
  marginBottom: "var(--gap-s)",
  fontWeight: "600",
  ...generalStyles,
};

const inputStyles: React.CSSProperties = {
  border: "none",
  fontFamily: "monospace",
  ...generalStyles,
};

type IDateInput = React.ComponentProps<"input"> & { label: string };

const DateInput = ({ label, ...props }: IDateInput) => {
  return (
    <div>
      <label htmlFor={label} style={labelStyles}>
        {label}
      </label>
      <input
        id={label}
        name={label}
        type="date"
        {...props}
        style={inputStyles}
      />
    </div>
  );
};

export default DateInput;
