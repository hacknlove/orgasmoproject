import VarPlugin from "./plugins/var";

const defaultConf = {};

const proxyHandler = {
  get(target, url) {
    return target.getValue(url);
  },

  deleteProperty(target, url) {
    target.deleteReource(url);
    return true;
  },

  set(target, url, value) {
    target.setValue(url, value);
    return true;
  },
};

export default class SharedState {
  plugins: Map<any, any>;
  conf: Record<string, any>;
  resources: Map<any, any>;
  proxy: ProxyConstructor;
  defaultError: any;

  constructor({ plugins = [] as any, conf = {}, initialState = {} } = {}) {
    this.plugins = new Map(
      plugins.map((Plugin) => [Plugin.protocol, new Plugin(this)])
    );

    if (!this.plugins.has("var")) {
      this.plugins.set("var", new VarPlugin());
    }

    this.conf = { ...defaultConf, ...conf };
    this.resources = new Map();

    this.proxy = new Proxy(this, proxyHandler);

    Object.entries(initialState).forEach(([url, value]) => {
      this.setValue(url, value);
    });
  }

  findPlugin(url) {
    return this.plugins.get(url.split(":", 1)[0]) || this.plugins.get("var");
  }

  getResource(url, options = {}) {
    let resource = this.resources.get(url);

    if (resource) {
      return resource;
    }

    const plugin = this.findPlugin(url);

    resource = plugin.newResource(url, options, this);

    this.resources.set(url, resource);

    return resource;
  }

  getValue(url, options = {}) {
    return this.getResource(url, options).value;
  }

  setValue(url, value, options = {}) {
    const resource = this.getResource(url, options);

    resource.setValue(value, options);
  }

  deleteReource(url) {
    const resource = this.getResource(url);

    resource.delete();

    this.resources.delete(url);
  }

  onChange(url, callback, options) {
    return this.getResource(url).onChange(callback, options);
  }

  fetch(url, options) {
    return fetch(url, options)
      .then((res) => res.json())
      .catch(() => options.defaultError ?? this.defaultError)
      .then((data) => {
        if (data && data.dynamicUpdate) {
          Object.entries(data.dynamicUpdate).forEach(
            ([url, value]: [string, any]) => {
              const __dynamicOptions = value?.__dynamicOptions;
              if (__dynamicOptions) {
                delete value.__dynamicOptions;
              }
              this.setValue(url, value, __dynamicOptions);
            }
          );
        }
        return data;
      });
  }
}
