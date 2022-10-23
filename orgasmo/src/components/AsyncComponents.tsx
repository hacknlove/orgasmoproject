import { useReducer } from "react";

const children = new Set();

let i = 0;

export default function asyncit(Component, props = {}, area) {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  }) as any;

  promise.resolve = resolve;
  promise.reject = reject;
  promise.props = props;
  promise.area = area;
  promise.Component = Component;
  promise.key = i++;

  children.add(promise);

  promise.finally(() => {
    children.delete(promise);
    AsyncComponents.forceUpdate();
  });
  AsyncComponents.forceUpdate();
  return promise;
}

AsyncComponents.forceUpdate = () => {
  /**/
};

export function AsyncComponents({ area }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  AsyncComponents.forceUpdate = forceUpdate;

  return (
    <>
      {Array.from(children).map(
        (promise: any) =>
          area === promise.area && (
            <promise.Component
              key={promise.key}
              {...promise.props}
              resolve={promise.resolve}
              reject={promise.reject}
            />
          )
      )}
    </>
  );
}
