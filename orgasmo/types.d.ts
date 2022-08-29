export type driver = Record<string, any>;

export interface FactoryParameters {
  driver: driver;
}

export type Component = { (any): JSX.Element };

export type Components = { (props: RowProps): JSX.Element };

export interface PageFactoryParameters {
  Components: Components;
}

export interface PageParameters {
  top: RowProps[];
  rows: RowProps[];
  bottom: RowProps[];
  src: string;
}

export type OrgasmoPage = { (PageParameters): JSX.Element };

export interface RowProps {
  type: string;
  props: Record<string, any>;
}

export interface DynamicProps {
  src?: string;
  rows: RowProps[];
  Components: Components;
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
  rows: RowProps[];
  Components: Components;
}
