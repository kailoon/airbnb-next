import Image from "next/image"
import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons"

function InfoCard({ location, img, title, description, star, price, total }) {
  return (
    <article className="flex py-7 border-b cursor-pointer hover:opacity-80 transition duration-200 ease-out first:border-t">
      <div className="relative h-24 w-40 md:h-52 md:w-80">
        <Image
          src={img}
          layout="fill"
          alt={title}
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col flex-1 pl-5">
        <div className="flex justify-between items-center">
          <p>{location}</p>
          <StarIcon className="h-7 cursor-pointer" />
        </div>
        <h3 className="text-xl font-medium">{title}</h3>
        <div className="border-b w-10 pt-2"></div>
        <p className="text-gray-500 flex-grow pt-2 text-sm">{description}</p>

        <div className="flex justify-between items-end">
          <p className="flex items-center">
            <StarFilledIcon className="h-4 text-red-400" />
            {star}
          </p>

          <div className="flex flex-col items-end">
            <p className="font-semibold text-lg lg:text-2xl">{price}</p>
            <p className="text-gray-400">{total}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default InfoCard
