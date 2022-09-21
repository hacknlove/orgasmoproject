export default function getItemConfig(config) {
  return {
    type: "Row",
    props: {
      title: `Row #${config.number + 1}`,
    },
    getProps: "random.rows",
    seed: config.number.toString(),
  };
}
