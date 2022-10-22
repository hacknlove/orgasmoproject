export type driver = Record<string, any>;

export interface FactoryParameters {
  driver: driver;
  noCache?: boolean;
}

export type Component = { (any): JSX.Element };

export type DComponent = { (props: RowProps): JSX.Element };

export interface PageFactoryParameters {
  DComponent: DComponent;
}

export interface PageParameters {
  header: RowProps[];
  main: RowProps[];
  mainMode?: "static" | "bubble" | "grow";
  threshold: number;
  footer: RowProps[];
  src: string;
  layout: string;
  meta: Record<string, any>;
}

export type OrgasmoPage = { (PageParameters): JSX.Element | null };

export interface RowProps {
  type: string;
  props: Record<string, any>;
}

export interface DynamicProps {
  src?: string;
  items: RowProps[];
  mode: "bubble" | "grow";
  threshold: number;
  DComponent: DComponent;
}

export interface ErrorObject {
  error: string;
}

export interface SliderProps extends Record<string, any> {
  intro: JSX.Element;
  introWidth: number;
  Component: Component;
  items: any[];
  src: string;
  cardWidth: number;
  ButtonNext: Component;
  ButtonPrev: Component;
}

export interface StaticProps {
  items: RowProps[];
  DComponent: DComponent;
}
