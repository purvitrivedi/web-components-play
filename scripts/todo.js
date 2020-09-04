class Todo extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.buttonText = 'Enter a value'
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="styles/modal.css">
    <slot></slot>
    <div id="add-task-wrapper"></div>
    <div class="task-list">
      <p>My tasks: </p>
      <ul id="tasks" style="list-style-type:none;">
      </ul>
    </div>

    <div id="backdrop"class="hidden"></div>
    <div id="modal" class="hidden"role="dialog">
      <header>
      <h1 id="headline"></h1>
    </header>
      <form>
        <input type="text" id="form-input" required>
        <div class="buttons">
        <input type="Submit"/>
        <button id="cancel-btn" type="button">Nevermind</button>
        </div>
      </form>
  
    </div>`

    this.addTaskWrapper = this.shadowRoot.querySelector('#add-task-wrapper')
    this.allTasks = this.shadowRoot.querySelector('#tasks')
    this.modalHeadline = this.shadowRoot.querySelector('#headline')
    this.formInput = this.shadowRoot.querySelector('#form-input')
    this.form = this.shadowRoot.querySelector('form')
    this.backdrop = this.shadowRoot.querySelector('#backdrop')
    this.modal = this.shadowRoot.querySelector('#modal')
    this.cancelBtn = this.shadowRoot.querySelector('#cancel-btn')

    this.form.addEventListener('submit', this._addTask.bind(this))
    this.backdrop.addEventListener('click', this._closeModal.bind(this))
    this.cancelBtn.addEventListener('click', this._closeModal.bind(this))
  }


  connectedCallback() {
    if (this.hasAttribute('text')) {
      this.text = this.getAttribute('text')
      this.placeholder = this.getAttribute('placeholder-text')
    }

    this.modalButton = document.createElement('button')
    this.modalButton.textContent = this.text
    this.addTaskWrapper.appendChild(this.modalButton)

    this.modalHeadline.textContent = this.text
    this.formInput.setAttribute('placeholder', this.placeholder)

    this.modalButton.addEventListener('click', this._openModal.bind(this))

  }

  _openModal() {
    this.backdrop.classList.remove('hidden')
    this.modal.classList.remove('hidden')
  }

  _closeModal() {
    this.backdrop.classList.add('hidden')
    this.modal.classList.add('hidden')
  }



  _addTask(event) {
    event.preventDefault()
    const submittedTask = this.formInput
    const taskWrapper = document.createElement('div')
    const newTask = document.createElement('li')
    const checkbox = document.createElement('input')
    const potato = document.createElement('img')

    newTask.textContent = submittedTask.value
    checkbox.setAttribute('type', 'checkbox')
    checkbox.addEventListener('click', () => this._delete(newTask))
    potato.setAttribute('src', 'styles/images/p-ninja.png')

    this.allTasks.appendChild(taskWrapper)
    taskWrapper.classList.add('task-wrapper')
    taskWrapper.appendChild(potato)
    taskWrapper.appendChild(newTask)
    taskWrapper.appendChild(checkbox)

    submittedTask.value = ''

    this._closeModal()
  }

  _delete(task) {
    if (!task.classList.contains('strike-through')) {
      task.classList.add('strike-through')
    } else {
      task.classList.remove('strike-through')
    }
  }


}

customElements.define('pt-todo', Todo)