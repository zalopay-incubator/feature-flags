/** Make a server call to get all registered feature flags.  */
export async function getFeatures() {
  try {
    const response = await fetch('http://localhost:4242/features?uid=123')
    return response.json()
  } catch (error) {
    return {}
  }
}