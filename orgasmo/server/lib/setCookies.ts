import nookies from 'nookies';

export default function setCookies ({ ctx, cookies }) {
    if (!cookies) {
        return
    }
    if (Array.isArray(cookies)) {
        cookies.forEach(({name, value, options}) => nookies.set(ctx, name, value, options));
        return
    }
    nookies.set(ctx, cookies.name, cookies.value, cookies.options);
}