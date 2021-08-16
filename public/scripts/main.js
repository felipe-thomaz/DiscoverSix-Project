import Modal from './modal.js'

const modal = Modal() //Puxa a função modal do arquivo modal.js

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

//////////////////////////////////////////////////////////////////

//Pegar todos os botões que existem com a classe check
const checkButtons = document.querySelectorAll('.actions a.check')

checkButtons.forEach(button => {
  button.addEventListener('click', handleClick)
})

//////////////////////////////////////////////////////////////////

//Quando o botão delete for clicado ele abre a modal
const deleteButton = document.querySelectorAll('.actions a.delete')

deleteButton.forEach(button => {
  //adicionar a escuta
  button.addEventListener('click', (event) => handleClick(event, false))
})
function handleClick(event, check = true){
  event.preventDefault() //evita que os botões comportem-se como um link (já que estão dentro de uma tag "a"), sendo assim, ao clicar no botão de "Marcar como lido" e "Excluir", a URL não será alterada.
  const text = check ? "Marcar como lida" : "Excluir"
  const slug = check ? "check" : "delete"
  const roomId = document.querySelector('#room-id').dataset.id
  const questionId = event.target.dataset.id

  const form = document.querySelector('.modal form')
  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`) 

  modalTitle.textContent = `${text} esta pergunta?`
  modalDescription.textContent = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
  modalButton.textContent = `Sim, ${text.toLowerCase()}`
  check ? modalButton.classList.remove("red") : modalButton.classList.add("red")

  //abrir modal 
  modal.open()
}