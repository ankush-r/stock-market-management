import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./DropDownStyle";

interface StockOption {
  stock_name: string;
  stock_symbol: string;
}

interface DropdownProps {
  options: StockOption[];
  onSelect: (value: string) => void;
  selectedValue: string | undefined;
  selectedSymbol: string | undefined;
}

function Dropdown({
  options,
  onSelect,
  selectedValue,
  selectedSymbol,
}: Readonly<DropdownProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
    navigate(`/market/${value}`);
  };

  return (
    <div className={classes.selectContainer}>
      <div
        className={classes.selectedOption}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={classes.logo_stock}>{selectedSymbol}</div>
        {selectedValue}
      </div>
      {isOpen && (
        <ul className={classes.optionsList}>
          {options.map((option) => (
            <li
              key={option.stock_name}
              className={`${classes.optionItem} ${classes.optionItemHover}`}
              onClick={() => handleSelect(option.stock_name)}
              onKeyDown={() => {}}
            >
              <div className={classes.logo_stock}>{option.stock_symbol}</div>
              {option.stock_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
