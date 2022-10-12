import { VarResource } from "./var";

export class ApiResource extends VarResource {
  plugin: any;
  fetchOptions: any;
  debounce: any;
  interval: any;
  debounced: any;

  constructor(
    url,
    {
      endpoint,
      headers,
      debounce = 0,
      interval,
      defaultError,
      skipFirst,
      ...options
    },
    plugin
  ) {
    super(url, options);
    this.plugin = plugin;
    this.fetchOptions = {
      endpoint: endpoint ?? url.replace(/^api:\/\//, ""),
      headers,
      defaultError,
    };
    this.debounce = debounce;
    this.interval = interval;
    if (!skipFirst) {
      this.refresh(0);
    }
  }

  set endpoint(url) {
    this.fetchOptions.endpoint = url;
    this.refresh();
  }

  set headers(headers) {
    this.fetchOptions.headers = headers;
    this.refresh();
  }

  async refresh(debounce?) {
    if (this.debounced) {
      clearTimeout(this.debounced);
    }
    if (debounce === 0) {
      this.value = await this.plugin.GET(this.fetchOptions.endpoint, {
        headers: this.headers,
        defaultError: this.defaultValue,
      });
      if (this.interval) {
        setTimeout(this.refresh.bind(this), this.interval, 0);
      }
      return;
    }
    this.debounced = setTimeout(
      this.refresh.bind(this),
      debounce || this.debounce,
      0
    );
  }
}

export default class ApiPlugin {
  static protocol = "api";
  sharedContext: any;
  defaultError: any;
  constructor(sharedContext) {
    this.sharedContext = sharedContext;
    this.defaultError = { ok: false };
  }

  newResource(url, options) {
    return new ApiResource(url, options, this);
  }

  async GET(url, options) {
    return this.sharedContext.fetch(url, {
      headers: options.headers,
    });
  }
}
