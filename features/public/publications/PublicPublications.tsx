import PublicationCard from './PublicationCard'

const PublicPublications = () => {
  return (
    <section className='container pt-12 xl:pt-24 pb-16 xl:pb-24'>
        <header className='flex flex-col items-center justify-center gap-3 mb-12 text-center'>
            <h6 className='text-sm md:text-base text-slate-600'>LATEST RESEARCH</h6>
            <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-800'>
                Featured Publications
            </h1>
            <p className='max-w-2xl xl:max-w-3xl text-sm md:text-base text-slate-600'>
                Discover innovative research conducted by students across diverse academic disciplines
            </p>
        </header>
        <PublicationCard/>
    </section>
  )
}

export default PublicPublications