"use client"
import { Fade } from "react-awesome-reveal";


const Cook = () => {

    return (
        <div className='relative' id="Vision">
            <div className="mx-auto max-w-7xl lg:pt-20 sm:pb-24 px-6">
                <div className='col-span-6 flex flex-col justify-center'>
                    <Fade direction={'up'} delay={400} cascade damping={1e-1} triggerOnce={true}>
                        <h2 className='text-pink text-lg font-normal mb-3 ls-51 uppercase text-start'>About us</h2>
                    </Fade>
                    <Fade direction={'up'} delay={800} cascade damping={1e-1} triggerOnce={true}>
                        <h3 className="text-3xl lg:text-5xl font-semibold text-black text-start">
                            Our Vision.
                        </h3>
                    </Fade>
                    <Fade direction={'up'} delay={1000} cascade damping={1e-1} triggerOnce={true}>
                        <p className='text-grey md:text-lg font-normal mb-10 text-start mt-2'>Our main mission is to empower patients. We are committed to providing personalized exercise recommendations using AI algorithms. By understanding each patient’s unique needs, we aim to enhance their physical health and overall quality of life. </p>                        </Fade>
                </div>


            </div>
        </div >
    )
}

export default Cook;
