"use client"
import Hero from "@/components/app/Hero";
import News from "@/components/app/News";
import Event from "@/components/app/Event";
import Membership from "@/components/app/Waitlist";
import Publication from "@/components/app/Publication";

export default function Home() { 
  return (
    <div>
      <Hero/>
      <div className="container">
        <Publication/>
        <News/>
        <Event/>
      </div>
      <Membership/>
    </div>
  );
}

