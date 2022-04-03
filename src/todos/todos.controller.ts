import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';
import { TodosService } from './todos.service';

// là il va écouter le port localhost:3000/todos !!
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // on veut dynamiser une partie de l'url pour accéder à todos/1 par ex
  @Get(':id')
  findOne(@Param('id') id: string) {
    // on peut récupérer l'id de la todo grâce à la dynamisation de l'url (cçd qu'on récup ce qu'on a mis dans l'url => grâce à param)
    // console.log('id', id);
    // on crée la méthode correspondante
    return this.todosService.findOne(id);
  }

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Post()
  createTodo(@Body() newTodo: CreateTodoDto) {
    // console.log('newTodo', newTodo);
    this.todosService.create(newTodo);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() todo: CreateTodoDto) {
    return this.todosService.update(id, todo);
  }
}

// 1. méthode findAll est chargée d’écouter les requetes get car on est dans un controller et que le méthode est entourée d’un décorateur get
// 2. on veut créer une instance de todoservice : un acesseur (souvent readonly), nom de la var qui contient l’instance de todoService (importé)
// 3. on peut retourner le résultat de l’appel à todosService qui nous met à dispo une méthode findAll
// 4. mtn on peut essayer localhost:3000/todos
