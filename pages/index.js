import Head from "next/head"
import Banner from "../components/Banner"
import Footer from "../components/Footer"
import Header from "../components/Header"
import LargeCard from "../components/LargeCard"
import MediumCard from "../components/MediumCard"
import SmallCard from "../components/SmallCard"

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>Airbnb Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />

      <main className="pt-10 px-8 sm:px-16 max-w-7xl mx-auto">
        {/* small cards */}
        <section>
          <h2 className="font-bold tracking-tight mb-5 text-3xl">
            Explore Nearby
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 pb-10">
            {exploreData?.map((data, index) => (
              <SmallCard
                key={index}
                location={data.location}
                image={data.img}
                distance={data.distance}
              />
            ))}
          </div>
        </section>

        {/* medium cards */}
        <section>
          <h2 className="font-bold tracking-tight mb-5 text-3xl">
            Live Anywhere
          </h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map((data, index) => (
              <MediumCard key={index} image={data.img} title={data.title} />
            ))}
          </div>
        </section>

        {/* large card */}

        <LargeCard
          image="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlist Created by Airbnb"
          buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const res1 = await fetch("https://links.papareact.com/pyp")
  const res2 = await fetch("https://links.papareact.com/zp1")
  const exploreData = await res1.json()
  const cardsData = await res2.json()

  return {
    props: {
      exploreData,
      cardsData,
    },
  }
}
