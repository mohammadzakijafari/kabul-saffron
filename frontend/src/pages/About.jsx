import React from 'react'
import SectionTitle from '../components/SectionTitle'
import AboutImage from '../assets/saffron.jpg';

const About = () => {
  return (
    <div className='px-4 md:px-20'>
      {/* Section Title */}
      <div className='text-4xl text-center pt-10 border-t'>
        <SectionTitle text1={'ABOUT'} text2={'US'} />
      </div>

      {/* About Section */}
      <div className='flex flex-col md:flex-row gap-10 my-16 items-center'>
        <div className='md:w-1/2 w-full flex justify-center items-center'>
          <img className='w-full md:w-[80%] object-cover rounded-lg shadow-lg' src={AboutImage} alt='About Us' />
        </div>

        {/* Text Section */}
        <div className='flex flex-col justify-center md:w-1/2 text-gray-700 text-lg px-4'>
          <div className='w-full md:w-4/5'>
            <h2 className='text-3xl font-bold text-gray-800 mb-10'>Our Mission</h2>
            <p className='mb-6 leading-relaxed'>
              Our mission is to offer top-quality saffron products, educate and excite people about the health benefits of this precious spice, and promote a healthy lifestyle in which people enjoy cooking.
              Additionally, we support local businesses, creative young minds, and try to build a better community here in Niedersachsen, Germany. On the other hand, we are also creating a cultural bridge 
              based out of Food by supporting the hardworking farmers who handpick each of the saffron flowers from rural area of Afghanistan to make this red gold available for the happiness and joy of our families.
            </p>

            {/* Additional Points or Bullets */}
            <ul className='list-disc list-inside mb-10'>
              <li>Top-quality saffron from Afghanistan.</li>
              <li>Supporting local businesses and communities in Afghanistan.</li>
              <li>Promoting a healthy lifestyle with quality food ingredients.</li>
            </ul>

            {/* Call to Action */}
            <button className='bg-red-700 text-white px-6 py-3 rounded-md hover:bg-red-600 transition'>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-3xl py-10 text-center'>
        <SectionTitle text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'>
        <div className='bg-gray-50 p-10 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform'>
          <h3 className='text-xl font-semibold mb-4'>Quality Assurance</h3>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit...</p>
        </div>
        
        <div className='bg-gray-50 p-10 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform'>
          <h3 className='text-xl font-semibold mb-4'>Convenience</h3>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit...</p>
        </div>

        <div className='bg-gray-50 p-10 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform'>
          <h3 className='text-xl font-semibold mb-4'>Exceptional Customer Service</h3>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit...</p>
        </div>
      </div>
    </div>


    // <div className='mx-20'>
    //   <div className='text-4xl text-center pt-10 border-t'>
    //     <SectionTitle text1={'ABOUT'} text2={'US'} />
    //   </div>

    //   <div className='flex flex-col md:flex-row gap-16 my-16'>
    //     <div className='w-1/2 flex justify-center items-center'>
    //       <img className='w-[70%]' src = {AboutImage} alt='' />
    //     </div>
        
    //     <div className='flex flex-col justify-center w-1/2 md:w-2/4 text-gray-700 text-lg mr-5'>
    //       <div className='w-2/3'>
    //         <p className='mb-8'> Our mission is to offer top-quality saffron products, educate and excite people about the health benefits of this precious spice, and promote a healthy lifestyle in which people enjoy cooking.
    //           Additionally, we support local businesses, creative young minds, and try to build a better community here in Niedersachsen, Germany. On the other hand, we are also creating a cultural bridge 
    //           based out of Food by supporting the hardworking farmers who handpick each of the saffron flowers from rural area of Afghanistan to make this red gold available for the happiness and joy of our families.
    //         </p>

    //         <b className='text-gray-800 text-2xl'> Our Mission </b>
    //         <p> Our mission is to offer top-quality saffron products, educate and excite people about the health benefits of this precious spice, and promote a healthy lifestyle in which people enjoy cooking.
    //           Additionally, we support local businesses, creative young minds, and try to build a better community here in Niedersachsen, Germany. On the other hand, we are also creating a cultural bridge 
    //           based out of Food by supporting the hardworking farmers who handpick each of the saffron flowers from rural area of Afghanistan to make this red gold available for the happiness and joy of our families.
    //         </p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className='text-2xl py-10'>
    //     <SectionTitle text1={'WHY'} text2={'CHOOSE US'} />
    //   </div>
    //   <div className='flex text-lg mb-20'>
    //     <div className='border px-14 py-20 flex flex-col gap-5'>
    //       <b> Quality Assurance: </b>
    //       <p className='text-gray-600'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores nulla odio sunt omnis ratione! Sit nostrum beatae atque iusto aspernatur 
    //         fuga amet laborum nulla, voluptatum minus. Eligendi iusto iste labore. 
    //       </p>
    //     </div>

    //     <div className='border px-14 py-20 flex flex-col gap-5'>
    //       <b> Convenience: </b>
    //       <p className='text-gray-600'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores nulla odio sunt omnis ratione! Sit nostrum beatae atque iusto aspernatur 
    //         fuga amet laborum nulla, voluptatum minus. Eligendi iusto iste labore. 
    //       </p>
    //     </div>

    //     <div className='border px-14 py-20 flex flex-col gap-5'>
    //       <b> Exceptional Customer Service: </b>
    //       <p className='text-gray-600'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores nulla odio sunt omnis ratione! Sit nostrum beatae atque iusto aspernatur 
    //         fuga amet laborum nulla, voluptatum minus. Eligendi iusto iste labore. 
    //       </p>
    //     </div>
    //   </div>
    // </div>
  )
}

export default About