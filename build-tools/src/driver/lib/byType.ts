export default function byType(files): Record<string, any> {
  const response = {};

  for (const file of files) {
    response[file.type] ??= [];
    response[file.type].push(file);
  }

  return response;
}
