import { useState, useMemo } from "react";
import * as equal from "fast-deep-equal";

export default function useEditItemConfig(original, file) {
  const [value, setValueOriginal] = useState<string>(
    JSON.stringify(original, null, 2)
  );

  const isDirty = useMemo(
    () => !equal(original, JSON.parse(value)),
    [value, original]
  );

  file.edit = {
    value,
    isDirty,
    setValue: (value) => {
      try {
        JSON.parse(value);
        setValueOriginal(value || "");
      } catch {
        //
      }
    },
    prepareToSend: () => JSON.parse(value),
  };

  file.monaco.defaultValue = value;
  file.monaco.onChange = file.edit.setValue;

  return file.edit;
}
