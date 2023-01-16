interface StepsProps {
  names: string[]
  stepPosition: number
}

export function Steps({ names, stepPosition }: StepsProps) {
  return (
    <ul className="steps">
      {names.map((name, index) => {
        if (stepPosition <= index) {
          return (
            <li
              key={index}
              className="step base-content text-gray-750 text-xs transition-all"
            >
              {name}
            </li>
          )
        }
        return (
          <li
            key={index}
            className="step base-content step-primary text-gray-750 text-xs transition-all"
          >
            {name}
          </li>
        )
      })}
    </ul>
  )
}
