const USER_ENDPOINT = `${import.meta.env.VITE_ENDPOINT}`

export const createUserEndpoints = userId => ({
  user: `${USER_ENDPOINT}/${userId}`,
  activity: `${USER_ENDPOINT}/${userId}/activity`,
  averageSession: `${USER_ENDPOINT}/${userId}/average-sessions`,
  performance: `${USER_ENDPOINT}/${userId}/performance`,
})
