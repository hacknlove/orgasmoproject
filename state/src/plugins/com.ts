import { VarResource } from "./var";

export class ComResource extends VarResource {
  sharedContext: any;
  crossSubcriptions: any[];
  urls = [];
  computation: any;

  constructor(
    url,
    { computation = () => undefined, urls = [], ...options } = {},
    sharedContext
  ) {
    super(url, options);
    this.sharedContext = sharedContext;
    this.crossSubcriptions = [];

    this.addUrls(urls);
    this.addComputation(computation);
  }

  addUrls(urls) {
    this.urls = urls;

    this.crossSubcriptions.forEach((subscription) => subscription());

    this.crossSubcriptions = this.urls.map((url) =>
      this.sharedContext.onChange(url, this.recompute)
    );
  }

  addComputation(computation) {
    this.computation = computation;
    this.recompute(this.value, this);
  }

  recompute(value, resource) {
    const newValue = this.computation(
      this.sharedContext.proxy,
      value,
      resource
    );

    if (newValue !== undefined) {
      this.value = newValue;
    }

    return newValue;
  }

  removeComputation() {
    this.computation = () => {
      undefined;
    };
  }
}

export default class ComPlugin {
  static protocol = "com";
  sharedContext: any;
  constructor(sharedContext) {
    this.sharedContext = sharedContext;
  }

  newResource(url, options) {
    return new ComResource(url, options, this.sharedContext);
  }
}
