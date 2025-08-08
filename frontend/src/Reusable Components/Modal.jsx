import React from 'react'

const Modal = ({children, id}) => {
  return (
    <dialog id={id} className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        {children}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
  )
}

export default Modal;