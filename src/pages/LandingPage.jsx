import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Link } from "react-router"
import companies from '../data/companies.json'
import faqs from '../data/faqs.json'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useUser } from "@clerk/clerk-react"


const LandingPage = () => {

  const {user} = useUser();

  console.log(!user)

  return (
    <main className="flex flex-col gap-7 sm:gap-15 py-2 sm:py-10">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center text-transparent 
        bg-gradient-to-br from-gray-500 via-gray-200 to-white bg-clip-text 
        text-4xl font-extrabold sm:text-5xl lg:text-7xl tracking-tighter py-4">Find Your Dream Job
          <span className="flex items-center gap-2 sm:gap-6">
            and get
            <img
              src="./Hired.png"
              alt="Logo"
              className="h-10 sm:h-13 lg:h-20 pt-1"
            />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-sm lg:text-lg">
          Explore thousands of job <span className="text-purple-500">or</span> Find the perfect candidate
        </p>
      </section>
      <div className="flex gap-1 sm:gap-3 justify-center">
        <Link to={"/jobs"}>
          <Button variant={"blue"} size={"xl"}>
            Find Jobs
          </Button>
        </Link>
        {(!user || user?.unsafeMetadata?.role == 'recruiter') && <Link to={"/post-jobs"}>
          <Button variant={"red"} size={"xl"}>
            Post Jobs
          </Button>
        </Link>}
      </div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <img src="/Poster.jpg" alt="Banner" className="w-full" />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      <Accordion type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  )
}

export default LandingPage