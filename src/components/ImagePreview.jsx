import React from 'react'
import Loading from './Loading'

const ImagePreview = (props) => {
  return (
    <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'>
        {/* //Orig image */}
        <div className='bg-white shadow-lg rounded-xl overflow-hidden'>
          <h2 className='text-xl font-semibold text-center bg-gray-800 text-white py-2'>
            Orig Image
          </h2>
          {props.uploaded ? 
          <img src={props.uploaded} alt="" className='w-full h-full object-cover'/>
          :<div className='flex items-center justify-center h-80 bg-gray-200'>No Image Selected</div>
          }
          {/* <img src={props.uploaded} alt="" className='w-full h-full object-cover'/>
          <div className='flex items-center justify-center h-80 bg-gray-200'>No Image Selected</div>
        */}</div>

        {/* enhanced image */}
        <div className='bg-white shadow-lg rounded-xl overflow-hidden'>
          <h2 className='text-xl font-semibold text-center bg-blue-800 text-white py-2'>
            Enhanced
          </h2>
          {props.enhanced && !props.loading &&
          (<img src={props.enhanced} alt="" className='w-full h-full object-cover'/>)}
          {/* <img src={props.enhanced} alt="" className='w-full h-full object-cover'/> */}
          {props.loading ?
          (<Loading/>)
          :<div className='flex items-center justify-center h-80 bg-gray-200'>No Enhanced image</div>
          }
        </div>

    </div>
  )
}

export default ImagePreview