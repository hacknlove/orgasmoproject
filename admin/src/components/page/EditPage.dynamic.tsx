import AdminContext from "../admin/AdminContext.dynamic";
import { useContext, useState, useEffect, useCallback, useMemo } from "react";

function fieldIsDirty({ pageConfig, editValues, field }) {
  return editValues[field] !== pageConfig[field] && "*";
}

function EditValue({
  pageConfig,
  editValues,
  onChange,
  field,
  label,
  ...props
}) {
  return (
    <>
      <label>
        {label} {fieldIsDirty({ pageConfig, editValues, field })}
      </label>
      <input
        type="text"
        data-field={field}
        value={editValues[field] || ""}
        onChange={onChange}
        {...props}
      />
    </>
  );
}

function EditValueTextArea({ pageConfig, editValues, onChange, field, label }) {
  return (
    <>
      <label>
        {label} {fieldIsDirty({ pageConfig, editValues, field })}
      </label>
      <textarea
        data-field={field}
        value={editValues[field] || ""}
        onChange={onChange}
        cols={80}
        rows={20}
      />
    </>
  );
}

export default function EditPage() {
  const { updatePageConfig, pageConfig } = useContext(AdminContext) as any;

  const getEditValues = useCallback(
    () => ({
      exactPath: pageConfig.exactPath,
      patternPath: pageConfig.patternPath,
      notes: pageConfig.notes,
      ratio: pageConfig.ratio,
    }),
    [pageConfig]
  );

  const [editValues, setEditValues] = useState(getEditValues);

  const reset = useCallback(() => {
    setEditValues(getEditValues);
  }, [getEditValues, setEditValues]);

  useEffect(reset, [reset]);

  const editValue = useCallback(
    (event) => {
      const field = event.target.dataset.field;

      const newValues = {
        ...editValues,
        [field]:
          event.target.value || (pageConfig[field] === "" ? "" : undefined),
      };

      switch (field) {
        case "exactPath":
          newValues.patternPath = newValues.exactPath
            ? undefined
            : pageConfig.patternPath;
          break;
        case "patternPath":
          newValues.exactPath = newValues.patternPath
            ? undefined
            : pageConfig.exactPath;
          break;
        default:
          break;
      }

      setEditValues(newValues);
    },
    [editValues, setEditValues]
  );

  const isDirty = useMemo(
    () =>
      Object.entries(editValues).find(
        ([key, value]) => value !== pageConfig[key]
      ),
    [editValues]
  );

  const apply = useCallback(() => {
    for (const [key, value] of Object.entries(editValues)) {
      if (!value === undefined) {
        delete editValues[key];
      }
    }

    if (Object.prototype.hasOwnProperty.call(editValues, "ratio")) {
      editValues.ratio = parseFloat(editValues.ratio) || undefined;
    }

    updatePageConfig({
      ...pageConfig,
      ...editValues,
    });
  }, [updatePageConfig, editValues]);

  return (
    <div className="_oadmin_dialog">
      <EditValue
        label="Exact Path"
        field="exactPath"
        editValues={editValues}
        onChange={editValue}
        pageConfig={pageConfig}
      />
      <EditValue
        label="Pattern Path"
        field="patternPath"
        editValues={editValues}
        onChange={editValue}
        pageConfig={pageConfig}
      />
      <EditValue
        label="Ratio"
        field="ratio"
        editValues={editValues}
        onChange={editValue}
        pageConfig={pageConfig}
        placeholder="Number"
        type="number"
      />
      <EditValueTextArea
        label="Notes"
        field="notes"
        editValues={editValues}
        onChange={editValue}
        pageConfig={pageConfig}
      />

      {isDirty && (
        <div>
          <button className="_oadmin_button" onClick={reset}>
            Reset
          </button>
          <button className="_oadmin_button" onClick={apply}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
