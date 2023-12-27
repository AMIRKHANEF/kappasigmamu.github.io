import { ApiPromise } from '@polkadot/api'
import { AccountId } from '@polkadot/types/interfaces'
import { useState } from 'react'
import { IconButton } from '../../../../components/IconButton'
import { doTx, StatusChangeHandler } from '../../../../helpers/extrinsics'
import { LoadingSpinner } from '../../components/LoadingSpinner'

type VoteButtonProps = {
  api: ApiPromise
  vote: Vote
  showMessage: (args: ShowMessageArgs) => any
  icon: string
  handleUpdate: () => void
  successText: string
  waitingText: string
  children: JSX.Element
}

export interface ShowMessageArgs {
  status: 'loading' | 'success' | 'error'
  message: string
}

export interface Vote {
  approve: boolean
  accountId: AccountId
  voterAccount: accountType
  type: string
}

export function VoteButton({
  api,
  vote,
  showMessage,
  icon,
  handleUpdate,
  successText,
  waitingText,
  children
}: VoteButtonProps) {
  const [loading, setLoading] = useState(false)

  const onStatusChange: StatusChangeHandler = ({ loading, message, status }) => {
    setLoading(loading)
    showMessage({ status, message })
    handleUpdate()
  }

  const extrinsic =
    vote.type === 'candidate'
      ? api.tx.society.vote(vote.accountId, vote.approve)
      : api.tx.society.defenderVote(vote.approve)

  const handleVote = async () => {
    setLoading(true)
    try {
      await doTx(api, extrinsic, successText, waitingText, vote.voterAccount, onStatusChange)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner center={false} small={true} />

  return (
    <IconButton icon={icon} onClick={handleVote}>
      <u>{children}</u>
    </IconButton>
  )
}
