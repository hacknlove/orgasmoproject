export class VarResource {
  url: string;
  cached: any;
  defaultValue: any;
  subscriptions: Map<any, any>;
  totalSubscriptionsCount: number;

  constructor(url, options: Record<string, any> = {}) {
    this.url = url;
    this.cached = options.firstValue;
    this.defaultValue = options.defaultValue;
    this.subscriptions = new Map();
    this.totalSubscriptionsCount = 0;
  }

  setValue(value) {
    this.cached = value;
    this.triggerSubscriptions();
  }

  getValue() {
    return this.cached ?? this.defaultValue;
  }

  triggerSubscriptions() {
    for (const subscription of this.subscriptions.values()) {
      subscription(this.value, this);
    }
  }

  get value() {
    return this.getValue();
  }

  set value(value) {
    this.setValue(value);
  }

  onChange(callback) {
    const key = this.totalSubscriptionsCount++;

    this.subscriptions.set(key, callback);
    return () => this.subscriptions.delete(key);
  }
}

export default class VarPlugin {
  static protocol = "var";
  newResource(url, options) {
    return new VarResource(url, options);
  }
}
