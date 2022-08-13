export default function cleanJson (obj) {
  if (obj === null || obj === undefined) {
    return null
  }
  if (Array.isArray(obj)) {
    return obj.map(cleanJson)
  }
  if (obj instanceof Date) {
    return obj.toISOString()
  }
  if (obj.toHexString instanceof Function) {
    return obj.toHexString()
  }
  if (typeof obj === 'object') {
    for (const key in obj) {
      obj[key] = cleanJson(obj[key])
    }
  }
  return obj
}

export async function cleanAwaitJson (obj) {
  if (obj === null || obj === undefined) {
    return null
  }
  if (obj instanceof Promise) {
    return cleanAwaitJson(await obj)
  }
  if (Array.isArray(obj)) {
    return Promise.all(obj.map(o => cleanAwaitJson(o)))
  }
  if (obj instanceof Date) {
    return obj.toISOString()
  }
  if (obj.toHexString instanceof Function) {
    return obj.toHexString()
  }
  if (typeof obj === 'object') {
    for (const key in obj) {
      obj[key] = await cleanAwaitJson(obj[key])
    }
  }
  return obj
}

export function withCleanJson (callback) {
  return async function getServerSideProps (ctx) {
    const response = await callback(ctx)
    if (response.props && ! ctx.jsonCleaned) {
      response.props = await cleanAwaitJson(response.props)
      ctx.jsonCleaned = true
    }
    return response
  }
}