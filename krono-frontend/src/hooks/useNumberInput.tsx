import { useState } from "react";

const useNumberInput = (
  min: number = 0,
  max?: number,
  decimalPlaces?: number,
) => {
  const [value, setValue] = useState<number>(0);
  const [displayValue, setDisplayValue] = useState<string>("");

  const handleInputChange = (inputValue: string) => {
    if (inputValue === "") {
      setDisplayValue("");
      setValue(0);
      return;
    }

    if (inputValue === ".") {
      setDisplayValue("0.");
      return;
    }

    if (inputValue === "0") {
      setDisplayValue("0");
      setValue(0);
      return;
    }

    // Remove non-numeric characters except dot
    const cleanedValue = inputValue.replace(/[^0-9.]/g, "");

    // Prevent multiple dots
    const dotCount = (cleanedValue.match(/\./g) || []).length;
    if (dotCount > 1) {
      return;
    }

    // Check decimal places
    const parts = cleanedValue.split(".");
    if (parts[1] && decimalPlaces && parts[1].length > decimalPlaces) {
      return;
    }

    // Validate numeric input
    if (/^\d*\.?\d*$/.test(cleanedValue)) {
      setDisplayValue(cleanedValue);
      // Parse the numeric value if valid
      const numericValue = parseFloat(cleanedValue);
      if (!isNaN(numericValue)) {
        setValue(numericValue);
      } else {
        setValue(0);
      }
    }
  };

  const handleInputBlur = () => {
    if (value === 0) {
      setDisplayValue("");
      return;
    }

    // Apply min and max constraints
    let constrainedValue = value;
    if (min !== undefined) constrainedValue = Math.max(min, constrainedValue);
    if (max !== undefined) constrainedValue = Math.min(max, constrainedValue);

    if (decimalPlaces === undefined) {
      setValue(constrainedValue);
      setDisplayValue(constrainedValue.toString());
      return;
    }

    const formattedValue = constrainedValue.toFixed(decimalPlaces);
    const trimmedValue = parseFloat(formattedValue).toString();
    setValue(parseFloat(trimmedValue));
    setDisplayValue(trimmedValue);
  };

  return { value, displayValue, handleInputChange, handleInputBlur };
};

export default useNumberInput;
