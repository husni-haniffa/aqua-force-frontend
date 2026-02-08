import { Loader } from 'lucide-react'

type ButtonLoaderProps = {
  text: string
}

const ButtonLoader = ({ text }: ButtonLoaderProps) => {
  return (
    <span className="flex items-center gap-3">
      <Loader className="animate-spin text-white" />
      {text}
    </span>
  )
}

export default ButtonLoader
