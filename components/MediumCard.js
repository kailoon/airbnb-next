import Image from "next/image"

function MediumCard({ title, image }) {
  return (
    <div className="cursor-pointer hover:scale-105 transform transition durantion-300 ease-out">
      <div className="relative h-80 w-80">
        <Image src={image} layout="fill" className="rounded-xl" />
      </div>
      <p className="text-2xl mt-3">{title}</p>
    </div>
  )
}

export default MediumCard
