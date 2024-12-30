import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import SERVER_BASE_URL from '../services/serverUrl';
const Videoplayer = ({show,handleClose,podcast,index}) => {

     const [currentIndex,setCurrentIndex] = useState(index)
  
    const goToNextPodcast = ()=>{
      if (podcast?.episodes?.length === currentIndex + 1) {
        alert("This is the last episode");
        return;
      }
      setCurrentIndex(currentIndex + 1);
    }
    const goToPreviousPodcast = ()=>{
      if(currentIndex === 0){
        alert("This is the first episode")
        return
      }
      setCurrentIndex(currentIndex - 1);
    }
    useEffect(()=>{
      setCurrentIndex(index)
    },[handleClose])
  return (
    <>
      <Modal
        size="lg"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <video
              controls
              style={{ width: "100%", height: "395" }}
              className="rounded p-4"
              src={`${SERVER_BASE_URL}/uploads/${podcast?.episodes[currentIndex].podcastFile}`}
            ></video>
            <h4 className="Name px-4 overflow-hidden text-ellipsis whitespace-nowrap">
              {podcast?.episodes[currentIndex].title}
            </h4>
            <div className="Description px-4 text-sm font-semibold">
              {podcast?.episodes[currentIndex].desc}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={goToPreviousPodcast}>
            Previous Episode
          </Button>

          <Button variant="primary" onClick={goToNextPodcast}>
            Next Episode
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Videoplayer