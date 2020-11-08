/** Make a server call to get all registered feature flags.  */
export async function getFeatures() {
  try {
    const response = await fetch(`${process.env.REACT_APP_UNLEASH_API}?uid=123`)
    return response.json()
  } catch (error) {
    return {}
  }
}