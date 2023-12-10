import React from 'react';

const Spinner = () => {
  return (
    <>
    <div className='w-screen flex h-screen  justify-center'>

    <div className='animate-ping text-center w-6 h-6 m-1 rounded-full bg-sky-600'>
      
    </div>
    <div className='animate-ping w-6 h-6 m-1 rounded-full bg-green-400'>
      
    </div>
    <div className='animate-ping w-6 h-6 m-1 rounded-full bg-yellow-200'>
    </div>
    <div className='animate-ping w-6 h-6 m-1 rounded-full bg-red-200'>
    </div>
    </div>
    </>
  );
}

export default Spinner;
