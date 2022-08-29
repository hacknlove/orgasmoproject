import nookies from "nookies";

export default function setCookies({ ctx, cookies = [] }) {
  ctx.setCookies.forEach(({ name, value, options }) =>
    nookies.set(ctx, name, value, options)
  );

  cookies.forEach(({ name, value, options }) =>
    nookies.set(ctx, name, value, options)
  );
}
