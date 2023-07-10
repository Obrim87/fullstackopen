import Display from './components/Display'
import Button from './components/Button'

const App = () => {
  return (
    <div>
      <div>
        <Display />
      </div>
      <div>
        <Button
          type='DEC'
          label='-'
        />
        <Button
          type='ZERO'
          label='0'
        />
        <Button
          type='INC'
          label='+'
        />
      </div>
    </div>
  )
}

export default App
