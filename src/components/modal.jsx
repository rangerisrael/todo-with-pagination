import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../utils/providers/userProvider'

const Modal = ({children}) => {

  const {setModal} = useContext(UserContext);
  return (
		<div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.5)] w-screen h-screen'>
			<div className='flex justify-center items-center h-full'>
				<div className='bg-white max-w-[30rem] w-full'>
					<p onClick={() => setModal({toggle:false})} className='flex justify-end pr-4 pt-4'>
						&times;
					</p>
					<div className='p-4'>{children}</div>
				</div>
			</div>
		</div>
	);
}

export default Modal
