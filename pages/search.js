import { PlusIcon } from "@radix-ui/react-icons"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useRouter } from "next/router"
import { format } from "date-fns"
import InfoCard from "../components/InfoCard"
import Map from "../components/Map"
import { useState } from "react"

function Search({ searchResults }) {
  const router = useRouter()
  const { location, startDate, endDate, guest } = router.query
  const [highligtedLocation, setHighlightedLocation] = useState({})

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
  const formattedEndDate = format(new Date(endDate), "dd MMM yy")
  const range = `${formattedStartDate} - ${formattedEndDate}`

  return (
    <div>
      <Header placeholder={`${location} - ${range} - ${guest}`} />
      <main className="flex h-screen">
        <section className="px-6 pt-14 flex-grow overflow-y-scroll">
          <p className="text-xs text-gray-400">
            300+ Stays - <span>{range}</span> - for {guest} guests
          </p>
          <h1 className="text-3xl font-semibold tracking-tight mb-6">
            Stays in {location}
          </h1>

          <div className="hidden mb-5 sm:inline-flex text-xs items-center space-x-4 text-gray-800 whitespace-nowrap">
            <span className="filter-btn">Cancellation Flexibility</span>
            <span className="filter-btn">Type of Places</span>
            <span className="filter-btn">Price</span>
            <span className="filter-btn">Rooms &amp; Beds</span>
            <span className="filter-btn flex items-center">
              More filters <PlusIcon className="w-3 ml-2" />
            </span>
          </div>
          {/* results */}
          <div className="flex flex-col">
            {searchResults.map(
              ({
                location,
                img,
                title,
                description,
                star,
                price,
                total,
                long,
                lat,
              }) => (
                <div
                  key={img}
                  onMouseEnter={() => setHighlightedLocation({ long, lat })}
                  onMouseLeave={() => setHighlightedLocation({})}
                >
                  <InfoCard
                    location={location}
                    img={img}
                    title={title}
                    description={description}
                    star={star}
                    price={price}
                    total={total}
                  />
                </div>
              )
            )}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map
            searchResults={searchResults}
            highligtedLocation={highligtedLocation}
          />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Search

export async function getServerSideProps() {
  const res = await fetch("https://links.papareact.com/isz")
  const searchResults = await res.json()

  return {
    props: {
      searchResults,
    },
  }
}
