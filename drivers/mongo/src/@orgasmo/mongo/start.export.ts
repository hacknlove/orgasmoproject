import mongoProxy from "../../mongoProxy";

export default function ({ config }) {
  mongoProxy.connect((config.mongoURL = "mongodb://localhost:27017/orgasmo"));
}
