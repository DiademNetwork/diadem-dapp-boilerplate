import { connect } from 'react-redux'
import S from 'modules/selectors'
import A from 'modules/actions'
import blockchains from 'configurables/blockchains'

const mapStateToProps = (state) => ({
  userAddress: S.wallets.address(blockchains.primary.key)(state),
  fetchStatus: S.timeline.fetchStatus(state),
  hasMore: S.timeline.hasMore(state),
  timeline: S.timeline.list(state)
})

const mapDispatchToProps = {
  fetch: A.timeline.fetch.requested
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
