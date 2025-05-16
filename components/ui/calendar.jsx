import { useState } from "react";
export function Calendar({ selected, onSelect, ...props }) {
  const [date, setDate] = useState(selected || new Date());
  return (
    <input
      type="date"
      value={date.toISOString().split('T')[0]}
      onChange={e => {
        const newDate = new Date(e.target.value);
        setDate(newDate);
        onSelect?.(newDate);
      }}
      {...props}
    />
  );
}
