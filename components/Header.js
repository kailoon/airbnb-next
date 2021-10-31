import {
  MagnifyingGlassIcon,
  GlobeIcon,
  AvatarIcon,
  HamburgerMenuIcon,
  PersonIcon,
} from "@radix-ui/react-icons"
import { useRouter } from "next/router"
import Image from "next/image"
import { useState } from "react"

import { DateRangePicker } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [guest, setGuest] = useState(1)
  const router = useRouter()

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  }

  const resetInput = () => {
    setSearchInput("")
  }

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        guest,
      },
    })
    setSearchInput("")
  }

  return (
    <header className="sticky p-5 top-0 z-50 grid grid-cols-3 bg-white shadow md:px-10">
      {/* left */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src="https://links.papareact.com/qd3"
          objectFit="contain"
          objectPosition="left"
          layout="fill"
          alt="the logo image"
        />
      </div>
      {/* middle */}
      <div className="rounded-full border-gray-200 border-2 flex py-2 items-center overflow-hidden">
        <input
          type="text"
          placeholder={placeholder || "Start your Search"}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow outline-none bg-transparent pl-5 placeholder-gray-400 text-sm text-gray-600"
        />
        <MagnifyingGlassIcon className="text-white bg-red-400 h-8 w-8 rounded-full p-2 cursor-pointer hidden md:inline-flex md:mx-2" />
      </div>
      {/* right */}
      <div className="flex items-center space-x-4 justify-end text-gray-500 text-sm">
        <p className="hidden md:block">Become a host</p>
        <GlobeIcon className="h-6 cursor-pointer" />

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <HamburgerMenuIcon className="h-6 cursor-pointer" />
          <AvatarIcon className="h-6 cursor-pointer" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto my-3 rounded-lg overflow-hidden shadow">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div className="flex border-t p-5 justify-between items-center">
            <h2 className="font-medium flex-1">Number of Guests</h2>
            <div className="inline-flex items-center">
              <PersonIcon className="h-4 w-4 opacity-50" />
              <input
                type="number"
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
                min={1}
                className="w-12 pl-2 outline-none"
              />
            </div>
          </div>

          <div className="flex border-t items-center">
            <button
              onClick={resetInput}
              className="flex-grow cursor-pointer text-gray-500 border-r py-3 px-5 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={search}
              className="flex-grow cursor-pointer text-red-400 hover:bg-gray-50 py-3 px-5"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
