import { Injectable } from '@angular/core';
import { BookModel } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService{
    private books:BookModel[] = [];

    constructor(){
        let savedBooks = localStorage.getItem("books");
        this.books = savedBooks ? JSON.parse(savedBooks):[] 
    }

    getAllBooks(){
        return this.books;
    }

    addBook(book:BookModel){
        const id = this.books.length > 0 ? Math.max(...this.books.map(res => res.id || 0 )): 0;
        book.id = id + 1;
        this.books.push(book);
        localStorage.setItem("books",JSON.stringify(this.books));
    }
    deleteBook(id:number){
        let index = this.books.findIndex(res => res.id = id);
        this.books.splice(index,1);
        localStorage.setItem("books",JSON.stringify(this.books));
    }
}
