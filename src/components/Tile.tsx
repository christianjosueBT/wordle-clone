import className from 'classnames'
import { LetterState } from '../utils/word-utils'

interface TileProps {
  letter: string
  state: number
  className?: string
  onAnimationEnd?: Function
}

export default function Tile({
  letter,
  state,
  onAnimationEnd,
  ...rest
}: TileProps) {
  const classes = className(
    'w-16 h-16 border-solid border-2 border-neutral-700', // look and sizing
    'flex justify-center items-center', // flex stuff
    'font-sans font-bold text-3xl', // text stuff
    {
      'border-neutral-400': letter,
      'border-0 bg-neutral-700': state === LetterState.Miss,
      'border-0 bg-yellow-500': state === LetterState.Present,
      'border-0 bg-green-700': state === LetterState.Match,
    },
    rest.className
  )

  return (
    <div
      className={classes}
      onAnimationEnd={() => {
        if (onAnimationEnd) onAnimationEnd()
      }}
    >
      {letter.toUpperCase()}
    </div>
  )
}
