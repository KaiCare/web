"use client"
import Image from 'next/image';
import { Fade } from "react-awesome-reveal";
import Link from 'next/link';
import { useAuth } from "@clerk/nextjs";

const Banner = () => {

    const { isSignedIn } = useAuth();
    return (
        <div id="home-section" className='bg-lightpink'>
            <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
                <div className='grid grid-cols-1 lg:grid-cols-12 space-x-1'>
                    <div className='col-span-6 flex flex-col justify-center'>
                        <Fade direction={'up'} delay={400} cascade damping={1e-1} triggerOnce={true}>
                            <h1 className="text-4xl lg:text-7xl font-semibold mb-5 text-lightgrey md:4px lg:text-start text-center">
                                Where AI <br /> Meets Muscles 
                            </h1>
                        </Fade>
                        <Fade direction={'up'} delay={800} cascade damping={1e-1} triggerOnce={true}>
                            <p className='text-grey lg:text-lg font-normal mb-10 lg:text-start text-center'>KAICare is a compassionate haven where cutting-edge technology and empathetic care converge. Led by our AI companion, KAI the koala, we empower patients on their healing journey. 🌿🐨💙 </p>
                        </Fade>
                        <Fade direction={'up'} delay={1000} cascade damping={1e-1} triggerOnce={true}>
                            <div className='md:flex align-middle justify-center lg:justify-start'>
                                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                                    <button  className="flex border w-full md:w-auto mt-5 md:mt-0 border-grey justify-center rounded-full text-xl font-medium items-center py-5 px-10 mr-5 text-grey hover:text-white hover:bg-grey">Start </button>
                                </Link>
                            </div>
                        </Fade>
                    </div>

                    <div className='col-span-6 flex justify-center relative'>
                        
                        <Image src="/kai_banner.svg" alt="nothing" width={1000} height={805} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;
