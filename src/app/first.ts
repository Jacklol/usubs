import { Component, Input, Output, EventEmitter } from '@angular/core';
       
@Component({
    selector: 'first',
     template: `<input [ngModel]="Title" (ngModelChange)="onNameChange($event)" />`,
 		styles: [

        `
        input{
        	width:100%;
        	height:3.5rem;
        	font:  italic 190% serif; 
        	text-align:center;
        	}
        
        `
        ]
})
export class FirstPage{ 
     
 
    @Input() Title:string;
    @Output() TitleChange = new EventEmitter<string>();
    onNameChange(model: string){
         
        this.Title = model;
        this.TitleChange.emit(model);
    }
}