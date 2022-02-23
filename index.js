class Book{

    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

class ui{

    static displayBooks(){
        const books=store.getBooks();
        books.forEach((book)=>ui.addBookToList(book));
    }
static addBookToList(book){
   
    const list=document.querySelector("#book-list")
    const row=document.createElement("tr")
    row.innerHTML=`<td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.isbn}</td>
              <td><a href="#" class="btn btn-danger btn-sm delete"</a>X</td>`
            list.appendChild(row)
}

static clearAllField(){
    document.querySelector("#title").value="";
    document.querySelector("#author").value="";
    document.querySelector("#isbn").value="";
}
static deleteBook(e){
    if(e.classList.contains('delete')){
        if(confirm('Are you sure you want to delete this'))
        e.parentElement.parentElement.remove();
    }
}
static showAlert(msg,className){
    const div=document.createElement("div")
    div.className=`alert alert-${className}`
    div.appendChild(document.createTextNode(msg))
    
    const container=document.querySelector(".container")
    const form=document.querySelector("#book-form")
    
    container.insertBefore(div,form)
    
    setTimeout(function(){
        document.querySelector(".alert").remove()
    },
        4000)
}
}

class store{
  
    static addBook(book){
      
        const books=store.getBooks();
        books.push(book)
        localStorage.setItem("books",JSON.stringify(books));
    }

    static getBooks(){
        let books;
        if(localStorage.getItem("books")==null)
        books=[];
        else
        books=JSON.parse(localStorage.getItem("books"))
        return books;
    }
    static removeBook(isbn){
        const books=store.getBooks();
        console.log(books)
   books.forEach((book,index)=>{
       if(book.isbn==isbn) books.splice(index,1)
   })
localStorage.setItem("books",JSON.stringify(books))
    }
}
document.addEventListener('DOMContentLoaded',ui.displayBooks);
document.querySelector("#book-form").addEventListener('submit',(e)=>{
    e.preventDefault()   
    const title=document.querySelector("#title").value; 
    const author=document.querySelector("#author").value;
    const isbn=document.querySelector("#isbn").value;
 
if(title==''|| author==''|| isbn==''){

    ui.showAlert("Please Add All the Fields","danger")
        return;
    }
    else{
    const book=new Book(title,author,isbn);

ui.addBookToList(book)

store.addBook(book)

ui.clearAllField();

ui.showAlert("Book Added Succesfully","success");}

})
document.querySelector("#book-list").addEventListener('click',(e) =>{  
 
    ui.deleteBook(e.target);
    store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    //show delete alert msg
   ui.showAlert('Book Deleted successfully','success');

   
 
})
