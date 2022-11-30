export default function controllerToPromise(controller) {
  return (req, res) => {
    return new Promise((resolve, reject) => {
      controller(req, res, (error) => {
        if (error) {
          return reject(error);
        }
        resolve(undefined);
      });
    });
  };
}
