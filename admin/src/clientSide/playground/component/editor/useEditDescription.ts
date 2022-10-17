import { useState, useMemo } from "react";

export default function useEditDescription(original, file) {
  const [value, setValue] = useState<string>(original);

  const isDirty = useMemo(() => original !== value, [value, original]);

  file.monaco.defaultValue = value;
  file.monaco.onChange = setValue;

  file.edit = {
    value,
    isDirty,
    setValue,
    prepareToSend: () => value,
  };

  return file.edit;
}
