import { Component, Input, Output, EventEmitter } from '@angular/core';
       
@Component({
    selector: 'first',
     template: `<input [ngModel]="Title" (keyup)="CheckEnter($event)"
				(ngModelChange)="onNameChange($event)" />
				<button (click)="clickButton()">Find</button>`,
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
    @Output() onCheckEnter = new EventEmitter<KeyboardEvent>();
    @Output() onclickButton= new EventEmitter();
    keypress(){

    }
    onNameChange(model: string){
        this.TitleChange.emit(model);
    }
    CheckEnter(e:KeyboardEvent){
    	    	this.onCheckEnter.emit(e);

    }
    clickButton(){
    	this.onclickButton.emit();
    }
}