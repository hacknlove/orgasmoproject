import { Suspense, createElement } from "react";

function expandJSX(content, Components) {
  if (typeof content === "string") {
    return content;
  }
  if (!Array.isArray(content)) {
    return expandJSX([content], Components);
  }
  if (!content) {
    return null;
  }
  return (
    <>
      {content.map((item, i) => {
        if (item == null) {
          return null;
        }
        if (typeof item === "string") {
          return item;
        }
        return <DComponent key={i} {...item} Components={Components} />;
      })}
    </>
  );
}

function expandCreate(content, Components) {
  if (typeof content === "string") {
    return [content];
  }
  if (!Array.isArray(content)) {
    return expandCreate([content], Components);
  }
  return content.map((item) => {
    if (item == null) {
      return null;
    }
    if (typeof item === "string") {
      return item;
    }
    return createElement(DComponent, { ...item, Components });
  });
}

export default function DComponent({ type, props, Components }) {
  if (!type) {
    if (props) {
      console.error("Mising type");
      console.debug({
        props,
      });
    }
    return null;
  }
  const Component = Components[type];

  if (Component) {
    if (props?.content) {
      const { content, ...newProps } = props;

      return (
        <Suspense fallback={null}>
          <Component {...newProps}>{expandJSX(content, Components)}</Component>
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={null}>
          <Component {...props} />
        </Suspense>
      );
    }
  }

  if (type.match(/^[a-z]/)) {
    if (props?.content) {
      const { content, ...newProps } = props;
      const children = expandCreate(content, Components);
      return createElement(type, newProps, ...children);
    } else {
      return createElement(type, props);
    }
  }
  return <div data-component-name={type} />;
}
