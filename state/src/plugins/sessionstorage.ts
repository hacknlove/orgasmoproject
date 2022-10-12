/* global sessionStorage */
const PROTOCOLCUT = "sessionStorage://".length;

if (typeof setImmediate === "function") {
  global.sessionStorage = {} as any;
}

function parseIfPossible(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

const plugin = {
  name: "sessionStorage",
  regex: /^sessionStorage:\/\/./i,
  refresh(resource) {
    return parseIfPossible(sessionStorage[resource.key]);
  },
  getResource(resource) {
    resource.key = resource.url.substr(PROTOCOLCUT);

    if (sessionStorage[resource.key] !== undefined) {
      resource.value = parseIfPossible(sessionStorage[resource.key]);
      return;
    }

    if (resource.value === undefined) {
      return;
    }
    sessionStorage[resource.key] = JSON.stringify(resource.value);
  },
  get(url) {
    return parseIfPossible(sessionStorage[url.substr(PROTOCOLCUT)]);
  },
  set(resource) {
    if (resource === undefined) {
      return delete sessionStorage[resource.key];
    }
    sessionStorage[resource.key] = JSON.stringify(resource.value);
  },

  start() {
    global.sessionStorage = {} as any;
  },
};

export default plugin;
