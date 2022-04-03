// va décrire à quoi va ressembler ce qui voyage à travers une requête de type POST

export class CreateTodoDto {
    readonly id: number;
    readonly title: string;
    readonly done: boolean;
    readonly description?: string; 
}