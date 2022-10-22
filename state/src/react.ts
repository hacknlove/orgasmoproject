import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  createElement,
} from "react";

import SharedState from "./index.js";

export const ContextState = createContext({});

export const clientSide: Record<string, any> = {};

interface StateProviderParams {
  children: any;
  plugins?: any[];
  initialState?: any;
  testContextRef?: any;
}

export function DynamicStateProvider({
  children,
  plugins = [],
  initialState,
  testContextRef,
}: StateProviderParams) {
  const value = useMemo(() => {
    const sharedState = new SharedState({ plugins, initialState });
    clientSide.sharedState = sharedState;
    if (testContextRef) {
      testContextRef.sharedState = sharedState;

      if (typeof window === "object") {
        (window as Window).dispatchEvent(new Event("sharedStateReady"));
      }
      if (typeof parent === "object") {
        (parent as Window).postMessage("sharedStateReady");
      }
    }

    return sharedState;
  }, []);

  useEffect(() => {
    if (!value) {
      return;
    }

    if (initialState) {
      Object.entries(initialState).forEach(([key, v]) => {
        value.setValue(key, v);
      });
    }
  }, [value, initialState]);

  return createElement(ContextState.Provider, { value }, children);
}

export function WithDynamicValue({ url, children }) {
  const [value, setValue, resource] = useDynamicValue(url, null);

  return children({
    value,
    setValue,
    resource,
  });
}

export function useDynamicValue(
  resource: any,
  options?: null | Record<string, any>
) {
  resource = useDynamicResource(resource, options) ?? {
    value: null,
    url: null,
    setValue: (x) => set(x),
  };

  const [value, set] = useState(resource.value);

  useDynamicChange(resource.url, (value) => set(value), null);

  const setValue = useCallback(
    (newValue) => resource.setValue(newValue),
    [resource]
  );

  const response = [value, setValue, resource] as any;
  response.value = value;
  response.setValue = setValue;
  response.resource = resource;

  return response;
}

export function useDynamicResource(url: string, options?: any) {
  const sharedState: Record<string, any> = useContext(ContextState);
  if (typeof url !== "string") {
    return url;
  }
  return sharedState.getResource(url, options);
}

export function useDynamicChange(url, callback, options?) {
  const sharedState: Record<string, any> = useContext(ContextState);

  useEffect(
    () => url && sharedState.onChange(url, callback, options),
    [url, callback, options, sharedState]
  );
}

export function useDynamicState() {
  return useContext(ContextState);
}
