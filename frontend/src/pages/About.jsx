import React from 'react'
import SectionTitle from '../components/SectionTitle'
import AboutImage from '../assets/saffron.jpg';

const About = () => {
  return (
    <div className='mx-24'>
      <div className='text-4xl text-center pt-16 border-t'>
        <SectionTitle text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='flex flex-col md:flex-row gap-16 my-16'>
        <div className='w-1/2 flex justify-center items-center'>
          <img className='w-[70%]' src = {AboutImage} alt='' />
        </div>
        
        <div className='flex flex-col justify-center gap-3 w-1/2 md:w-2/4 text-gray-700 text-lg mr-10'>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, architecto. Iusto aut quod, et saepe nam necessitatibus quidem repellat 
            consectetur minima sint! Fugit impedit minus doloribus maiores! Debitis, ratione maxime. Lorem ipsum dolor sit amet, consectetur adipisicing 
            elit. Tempora minima nostrum soluta modi ex corporis laboriosam sed cumque dicta maxime architecto, earum repellat velit, qui quia, 
            praesentium eos voluptatum. At!
          </p>
          <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero suscipit sint necessitatibus corrupti odit soluta quibusdam! Eligendi 
            veniam explicabo, quas id mollitia modi temporibus vero earum eveniet ducimus quasi possimus. 
          </p>

          <b className='text-gray-800'> Our Mission </b>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, architecto. Iusto aut quod, et saepe nam necessitatibus quidem repellat 
            consectetur minima sint! Fugit impedit minus doloribus maiores! Debitis, ratione maxime. Lorem ipsum dolor sit amet, consectetur adipisicing 
            elit. Tempora minima nostrum soluta modi ex corporis laboriosam sed cumque dicta maxime architecto, earum repellat velit, qui quia, 
            praesentium eos voluptatum. At!
          </p>
        </div>
      </div>

      <div className='text-2xl py-10'>
        <SectionTitle text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex text-lg mb-20'>
        <div className='border px-10 py-12 flex flex-col gap-5'>
          <b> Quality Assurance: </b>
          <p className='text-gray-600'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores nulla odio sunt omnis ratione! Sit nostrum beatae atque iusto aspernatur 
            fuga amet laborum nulla, voluptatum minus. Eligendi iusto iste labore. 
          </p>
        </div>

        <div className='border px-10 py-12 flex flex-col gap-5'>
          <b> Convenience: </b>
          <p className='text-gray-600'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores nulla odio sunt omnis ratione! Sit nostrum beatae atque iusto aspernatur 
            fuga amet laborum nulla, voluptatum minus. Eligendi iusto iste labore. 
          </p>
        </div>

        <div className='border px-10 py-12 flex flex-col gap-5'>
          <b> Exceptional Customer Service: </b>
          <p className='text-gray-600'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores nulla odio sunt omnis ratione! Sit nostrum beatae atque iusto aspernatur 
            fuga amet laborum nulla, voluptatum minus. Eligendi iusto iste labore. 
          </p>
        </div>
      </div>
    </div>
  )
}

export default About