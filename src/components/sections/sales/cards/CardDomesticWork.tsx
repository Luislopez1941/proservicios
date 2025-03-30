import React from 'react'
import './styles/CardDomesticWork.css'
import { storeJobs } from '@/zustand/Jobs'

import '../modalSend/Send.css'

const CardDomesticWork = ({job}: any) => {

   const setModal = storeJobs(state => state.setModal)
  

    console.log('job',job)

  return (
    <div className='card__domestic-work'>
      {/* <div className='image_domestic-work'>
        
      </div> */}
      <div className='content'>
        <p className='title'>{job.job_title}</p>
        <p className='description'>{job.job_description}</p>
      </div>
      <div className='skills'>
        {job?.skills?.map((x: any) => (
          <div>
          <p>{x.name}</p>
        </div>
        ))}
      </div>
      <div className='btn-send'>
        <button onClick={() => setModal('modal-send')}>Mandar una oferta</button>
      </div>
 
    </div>
  )
}

export default CardDomesticWork
