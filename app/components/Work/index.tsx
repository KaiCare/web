"use client"
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Fade } from "react-awesome-reveal";


interface cardDataType {
    imgSrc: string;
    heading: string;
    subheading: string;
    link: string;
    url: string;
}

const cardData: cardDataType[] = [
    {
        imgSrc: '/images/Cook/mission.svg',
        heading: "Mission",
        subheading: "Empowering patients through personalized exercise recommendations, leveraging AI algorithms to enhance physical health and overall quality of life.",
        link: 'Learn more',
        url: '/#Mission'
    },
    {
        imgSrc: '/images/Cook/vision.svg',
        heading: "Vision",
        subheading: "At KaiCare, our vision is to revolutionize online physiotherapy by harnessing the power of artificial intelligence, fostering collaboration between patients and physiotherapists, and empowering patients to take control of their well-being.",
        link: 'Learn more',
        url: '/#Vision'
    },
    {
        imgSrc: '/images/Cook/values.svg',
        heading: "Values",
        subheading: "Compassion, Excellence, Integrity, and Innovation guide our actions at KaiCare, shaping our commitment to patient well-being and the advancement of physiotherapy practice.",
        link: 'Learn more',
        url: '/#Values'
    }
]

const Work = () => {
    return (


        <div>
            <div className='mx-auto max-w-7xl py-40 px-6' id="about-section">
                <div className='text-center mb-20' >
                    <Fade direction={'up'} delay={400} cascade damping={1e-1} triggerOnce={true}>
                        <h1 className="text-4xl lg:text-7xl font-semibold mb-5 text-pink md:4px text-center">
                            About us
                        </h1>
                    </Fade>

                </div>


                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-5 mt-32'>
                    <Fade direction={'up'} delay={1000} cascade damping={1e-1} triggerOnce={true}>
                        {cardData.map((items, i) => (
                            <div className='card-b p-8 relative rounded-3xl' key={i}>
                                <div className='work-img-bg rounded-full flex justify-center absolute sm:top-[-40%] md:top-[-40%] lg:top-[-30%] left-[25%]'>
                                    <Image src={items.imgSrc} alt={items.imgSrc}  width={210} height={1}/>
                                </div>
                                <h3 className='text-2xl text-black font-semibold text-center mt-16'>{items.heading}</h3>
                                <p className='text-lg font-normal text-black text-center text-opacity-50 mt-2'>{items.subheading}</p>
                                <div className='flex items-center justify-center'>
                                    <Link href={items.url}><p className='text-center text-lg font-medium text-pink mt-2 hover-underline'>{items.link}<ChevronRightIcon width={20} height={20} /></p></Link>
                                </div>
                            </div>
                        ))}
                    </Fade>
                </div>
            </div>
        </div>

    )
}

export default Work;
