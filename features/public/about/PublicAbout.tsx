
import Membership from '@/components/app/Waitlist'
import Hero from './Hero'
import HowWeSupport from './HowWeSupport'
import MeetTheTeam from './MeetTheTeam'

const PublicAbout = () => {
  return (
    <section>
      <Hero/>
      <MeetTheTeam/>
      <HowWeSupport/>
      <Membership/>
    </section>
  )
}

export default PublicAbout