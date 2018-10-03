import { createBaseSelector } from 'modules/utils'

const getFacebookRegistration = createBaseSelector(['facebook', 'registration'])

export const isRegistered = getFacebookRegistration(['isRegistered'])
