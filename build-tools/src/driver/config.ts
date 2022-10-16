export const regexp =
  /^(?<from>\.\/(?<route>[^.]*)\/(?<filename>[^/.]+)\.(?<type>export|event))\.ts$/;
export const globPath = "./**/*.{export,event}.{js,ts,mjs,cjs}";
