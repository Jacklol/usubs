import { Component, Input, Output, EventEmitter } from '@angular/core';
       
@Component({
    selector: 'first',
     template: `<input [ngModel]="Title"  placeholder="введите запрос" (keyup)="CheckEnter($event)"
				(ngModelChange)="onNameChange($event)" /><button
				 class='button' (click)="clickButton()">&rang;</button>`,
 		styles: [

        `
        input{
        	width:80%;
        	height:3.5rem;
        	font:  italic 190% serif; 
        	text-align:center;
        	padding:0;
        	margin:0;
        	border-width:1px;
        	}
        
        .button{
        	width:15%;
        	height:3.8rem;
        	font:  190% serif;
        	padding:0;
        	margin:0;
        	border-width:1px;
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