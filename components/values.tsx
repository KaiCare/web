"use client";
import { Fade } from "react-awesome-reveal";

const Values = () => {
  return (
    <div className="relative" id="Values">
      <div className="mx-auto max-w-7xl lg:pt-20 sm:pb-24 px-6">
        <div className="col-span-6 flex flex-col justify-center">
          <Fade
            direction={"up"}
            delay={400}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <h2 className="text-pink text-lg font-normal mb-3 ls-51 uppercase text-start">
              About us
            </h2>
          </Fade>
          <Fade
            direction={"up"}
            delay={800}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <h3 className="mb-5 text-3xl lg:text-5xl font-semibold text-black text-start">
              Our Values.
            </h3>
          </Fade>
          <Fade
            direction={"up"}
            delay={1000}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <li>
              <b>Compassion</b>: We approach every interaction with empathy and
              genuine care. Our commitment to compassion drives us to create
              solutions that truly benefit patients.
            </li>
            <li>
              <b>Excellence</b>: We hold ourselves to the highest standards. Our
              pursuit of excellence ensures that our AI-driven recommendations
              are accurate, reliable, and effective.
            </li>
            <li>
              <b>Integrity</b>: Transparency and honesty are at the core of our
              operations. We maintain the highest ethical standards in all our
              interactions.
            </li>
            <li>
              <b>Innovation</b>: We embrace innovation as a means to transform
              healthcare. KaiCare continually seeks new ways to improve patient
              outcomes and elevate physiotherapy practice.
            </li>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Values;
