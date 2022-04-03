import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';

// import qui permet de transofrmer la classe en service
@Injectable()
export class TodosService {

    // on rajoute Todo (= interface qui nous a permis de typer)
    todos: Todo[] = [
        {
            id: 1,
            title: 'todos app',
            description: 'Créer Nest js to do app',
            done: false, 
        },
        {
            id: 2,
            title: 'bread',
            description: 'Acheter du pain',
            done: true, 
        },
    ];

    findOne(id: string){
        return this.todos.find(todo => todo.id === Number(id)); 
    }

    findAll(): Todo[] {
        console.log(this.todos); 
        return this.todos; 
    }

    // mtn qu'on a le DTO on l'utilise !
    create(todo: CreateTodoDto) {
        this.todos = [...this.todos,todo as Todo];
    }

    // on passe l'id du todo qu'on souhaite modifier et ce qui aurait voyagé sous forme de body => todo
    update(id: string, todo: Todo) {
        // on récupère le todo à mettre à jour
        const todoToUpdate = this.todos.find(todo => todo.id === Number(id)); 
        // on veut se couvrir un peu pour être sûre que la todo existe
        // new notFoundException est fourni par nest
        // on peut personnaliser le message 
        if  (!todoToUpdate){
            return new NotFoundException('je personnalise le msg erreur')
        }
        // appliquer les modifications que de certaines propriétés par ex (pas tout le todo)
        // on veut vérifier si le todo qui nous est passé a une propriété 
        // done est un booléen donc on doit toujours mettre hasOwnProp sinon c'était toujours à true
        if (todo.hasOwnProperty('done')){
            todoToUpdate.done = todo.done; 
        }
        if (todo.title) {
            todoToUpdate.title = todo.title; 
        }
        if (todo.description) {
            todoToUpdate.description = todo.description; 
        }
        // mettre à jour le tableau de todos en remplacant le tableau existant par le todo qui aurait été passé en param
        // map renvoie un nouveau tableau
        // si le todo de todos est différent de celui qui a été passé en pram ça veut dire qu'il y a eu des modifs 
        // revoir moitié de la vidéo 8 !!
        const updatedTodos = this.todos.map (todo => todo.id !== Number(id) ? todo : todoToUpdate);
        this.todos = [...updatedTodos];
        return {updatedTodo: 1, todo: todoToUpdate}

    }

}
