import { createBaseSelector } from 'modules/utils'

const getRegistration = createBaseSelector(['registration'])

export const isRegistered = getRegistration(['isRegistered'])
