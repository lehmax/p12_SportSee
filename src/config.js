const userEndpoint = `${import.meta.env.VITE_ENDPOINT}`

export const ENDPOINTS = {
  user: `${userEndpoint}`,
  activity: `${userEndpoint}/activity`,
  averageSession: `${userEndpoint}/average-sessions`,
  performance: `${userEndpoint}/performance`,
}
