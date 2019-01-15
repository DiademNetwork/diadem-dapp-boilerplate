import { createBaseSelector } from 'modules/utils'

const getAchievements = createBaseSelector(['achievements'])

export const createStatus = getAchievements(['createStatus'])

export const list = getAchievements(['list'])
export const userList = getAchievements(['userList'])
export const fetchStatus = getAchievements(['fetchStatus'])
