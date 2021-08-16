  export default function Modal(){ //exportando a função Modal

  const modalWrapper = document.querySelector('.modal-wrapper')
  const cancelButton = document.querySelector('.button.cancel')
  //const readStatus = document.querySelector('.question-wrapper')

  cancelButton.addEventListener("click", close)
  //readStatus.addEventListener('click', read)

  function open(){
    //funcionalidade de atribuir a classe active para a modal
    modalWrapper.classList.add("active")
  }
  function close(){
    //funcionalidade de remover a classe active para a modal
    modalWrapper.classList.remove("active")
  }

  // function read(){
  //   readStatus.classList.add("read")
  // }

  return{
    open,
    close
  }
}