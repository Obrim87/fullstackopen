const Anecdote = ({ anecdote }) => (
  <div>
    <h3>Anecdote:</h3>
    <p>"{anecdote.content}."</p>
    by <strong>{anecdote.author}.</strong>
    <p>
      <a href={anecdote.info} target='_blank' rel='noreferrer'>
        {anecdote.info}
      </a>
    </p>
    <p>
      This anecdote has {anecdote.votes}{' '}
      {anecdote.votes === 1 ? 'vote.' : 'votes.'}
    </p>
    <button>Vote</button>
  </div>
)

export default Anecdote
