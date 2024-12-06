import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookModel } from '../models/book.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  
  private bookService = inject(BookService);
  private formBuilder = inject(FormBuilder);

  books:BookModel[] = [];
  

  bookForm:FormGroup = new FormGroup({})
  ngOnInit(): void {
      this.bookForm = this.formBuilder.group({
      id:[0],
      title:['',Validators.required],
      author:['',Validators.required],
    })

    this.books = this.bookService.getAllBooks();
  }

  deleteBook(id:number){
    this.bookService.deleteBook(id);
  }
  

  onSubmit(){
    if(this.bookForm.valid){
      console.log(this.bookForm.value);
      let book = this.bookForm.value;
      this.bookService.addBook(book);
      this.bookForm.reset();
    }
    else{
      console.log("Form is invalid");
    }
  }
}
