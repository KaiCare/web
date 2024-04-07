"use client"
import Slider from "react-slick";
import React, { Component } from "react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

// CAROUSEL DATA

interface DataType {
    profession: string;
    name: string;
    imgSrc: string;
}


export default class MultipleItems extends Component {

    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 3,
            // centerMode: true,
            slidesToScroll: 1,
            arrows: false,
            autoplay: false,
            speed: 4000,
            autoplaySpeed: 2000,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 450,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                }
            ]
        };


        return (
            <div className="py-10 sm:py-20 bg-darkpink" id="kai-section">
                <div className='mx-auto '>

                    <div className="text-center">
                        <Fade direction={'up'} delay={400} cascade damping={1e-1} triggerOnce={true}>
                            <h2 className='text-pink text-lg font-normal mb-3 tracking-widest uppercase '>OUR EXPERT</h2>
                        </Fade>
                        <Fade direction={'up'} delay={800} cascade damping={1e-1} triggerOnce={true}>
                            <h3 className="text-3xl lg:text-5xl font-semibold text-black">
                                Let&apos;s meet Kai.
                            </h3>
                        </Fade>
                    </div>

                    <div className="mx-auto max-w-7xl  ">
                        <div className='grid grid-cols-1 lg:grid-cols-12 my-16 space-x-5'>

                            <div className='col-span-6 flex justify-start'>
                                <Image src="/images/Expert/kai.svg" alt="nothing" width={636} height={808} />
                            </div>

                            <div className='col-span-6 flex flex-col justify-center'>
                                <Fade direction={'up'} delay={800} cascade damping={1e-1} triggerOnce={true}>
                                    <p className="text-grey md:text-lg font-normal mb-10 text-start mt-2"> Hi there! I’m Kai, your friendly and fuzzy health advisor. 🐨 </p>
                                </Fade>
                                <Fade direction={'up'} delay={400} cascade damping={1e-1} triggerOnce={true}>
                                    <li><b>Name</b>: Kai (pronounced like “k-eye”)</li>
                                    <li><b>Role</b>: Your trusty sidekick in wellness</li>
                                    <li><b>Specialty</b>: Delivering AI-backed medical advice with a touch of koala charm</li>
                                    <li><b>Favorite Snack</b>: Eucalyptus leaves and digital data (yum!)</li>
                                </Fade>
                                <Fade direction={'up'} delay={1000} cascade damping={1e-1} triggerOnce={true}>
                                    <p className='text-grey md:text-lg font-normal text-start mt-5'><b>Why Choose KaiCare?</b></p>
                                    <li>🌿 <b>Leafy Wisdom</b>: Just like eucalyptus leaves nourish my body, our AI algorithms provide nourishing advice for yours. From muscle stretches to mental well-being, I’ve got you covered.</li>
                                    <li>🌏 <b>Global Reach</b>: No matter where you are, KaiCare bridges the gap between patients and physiotherapists. Let’s make health accessible worldwide!</li>
                                    <li>🤗 <b>Warm Hugs</b>: Imagine my fluffy koala paws giving you a virtual hug. That’s the level of care we bring to every interaction.</li>
                                </Fade>
                                <Fade direction={'up'} delay={1000} cascade damping={1e-1} triggerOnce={true}>
                                    <p className='text-grey md:text-lg font-normal text-start mt-5'><b>What Can I Do for You?</b></p>
                                    <li>🏋️‍♀️ <b>Exercise Rx</b>: Need personalized workout recommendations? I’ve got 'em! Let’s sculpt those muscles together.</li>
                                    <li>🤕 <b>Pain Decoder</b>: Describe your discomfort, and I’ll translate it into physio-speak. No more mysterious aches!</li>
                                    <li>🌞 <b>Sunshine Vibes</b>: Because even koalas know that a little sunshine does wonders for the soul.</li>
                                </Fade>
                            </div>

                        </div>
                        <Fade direction={'up'} delay={1000} cascade damping={1e-1} triggerOnce={true}>
                            <p>Remember, I’m not just an AI; I’m your koala confidante. So, let’s hop on this eucalyptus branch of health and well-being! 🌿🌟</p>
                            <p className='text-grey md:text-lg font-normal text-start mt-5'>Disclaimer: Kai is not a licensed physiotherapist, but he’s pretty good at eucalyptus-fueled advice! 😄</p>
                         </Fade>

                    </div>
                </div>
            </div>

        );
    }
}
