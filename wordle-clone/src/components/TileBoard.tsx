import { useState, useEffect } from 'react'
import TileRow from './TileRow'
import {
  words,
  LetterState,
  getRandomWord,
  computeStateArray,
} from '../utils/word-utils'

export default function TileBoard() {
  const [wordList, setWordList] = useState(Array(6).fill(''))
  const [active, setActive] = useState(0)
  const [stateMatrix, setStateMatrix] = useState(
    Array.from({ length: 6 }, () => Array(5).fill(LetterState.Empty))
  )
  const [answer, setAnswer] = useState(getRandomWord().toLowerCase())

  const addLetter = (letter: string) => {
    if (wordList[active].length >= 5) return

    const updatedWordList = wordList.map((word, index) => {
      if (index === active) return word + letter.toUpperCase()
      else return word
    })

    setWordList(updatedWordList)
  }

  const deleteLetter = () => {
    const updatedWordList = wordList.map((word, index) => {
      if (index === active) return word.slice(0, -1)
      else return word
    })

    setWordList(updatedWordList)
  }

  const handleKeydown = (event: object) => {
    // if pressed key is an alphabet character
    if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122)
    ) {
      if (wordList[active].length >= 5) return
      return addLetter(event.key)
    }
    // if pressed key is backspace
    if (event.key === 'Backspace') return deleteLetter()
    // if pressed key is enter
    if (event.key === 'Enter') {
      if (wordList[active].length !== 5)
        return console.log('Not enough letters')
      if (!words.has(wordList[active].toLowerCase()))
        return console.log('Not in word list')

      const stateArray = computeStateArray(
        wordList[active].toLowerCase(),
        answer
      )
      const newStateMatrix = stateMatrix.map((arr, i) => {
        if (i === active) return stateArray
        else return arr
      })
      setStateMatrix(newStateMatrix)
      setActive(active + 1)
    } else return
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [wordList, active])

  return (
    <div className='flex flex-col gap-2 items-stretch justify-center max-w-sm'>
      {wordList.map((word, index) => {
        return (
          <TileRow
            word={word}
            key={index}
            stateArray={stateMatrix[index]}
          ></TileRow>
        )
      })}
    </div>
  )
}