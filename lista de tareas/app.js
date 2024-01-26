import readline from 'readline';
import chalk from 'chalk';

const tasks = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

function displayTasks() {
  console.log('\nLista de tareas:\n');
  tasks.forEach((task, index) => {
    const taskStatus = task.completed ? chalk.green('Completada') : chalk.red('Pendiente');
    console.log(`${index + 1}. [${taskStatus}] ${task.description}`);
  });
  console.log('\n');
}

function addTask() {
  rl.question('Ingrese la descripción de la tarea: ', (description) => {
    tasks.push({ description, completed: false });
    displayTasks();
    askForAction();
  });
}

function deleteTask() {
  displayTasks();
  rl.question('Ingrese el número de la tarea que desea eliminar: ', (index) => {
    if (index > 0 && index <= tasks.length) {
      tasks.splice(index - 1, 1);
      displayTasks();
    } else {
      console.log(chalk.red('¡Número de tarea no válido!'));
    }
    askForAction();
  });
}

function completeTask() {
  displayTasks();
  rl.question('Ingrese el número de la tarea que desea marcar como completada: ', (index) => {
    if (index > 0 && index <= tasks.length) {
      tasks[index - 1].completed = true;
      displayTasks();
    } else {
      console.log(chalk.red('¡Número de tarea no válido!'));
    }
    askForAction();
  });
}

function askForAction() {
  console.log('Acciones disponibles:');
  console.log('1. Agregar tarea');
  console.log('2. Eliminar tarea');
  console.log('3. Marcar tarea como completada');
  console.log('4. Salir');

  rl.question('Seleccione una acción (1-4): ', (choice) => {
    switch (choice) {
      case '1':
        addTask();
        break;
      case '2':
        deleteTask();
        break;
      case '3':
        completeTask();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log(chalk.red('¡Opción no válida!'));
        askForAction();
        break;
    }
  });
}

console.log(chalk.blue('Bienvenido al gestor de tareas.\n'));
askForAction();
