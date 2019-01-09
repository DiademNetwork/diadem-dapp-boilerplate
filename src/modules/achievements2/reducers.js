const initialState = {}

export default function createReducer (state, { type }) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    default: return state
  }
}
