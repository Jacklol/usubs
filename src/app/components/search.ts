import { Component, Input, Output, EventEmitter } from '@angular/core';
       
@Component({
    selector: 'search',
     template: `
                <input [ngModel]="Title"  placeholder="enter request" (keyup)="CheckEnter($event)"
				        (ngModelChange)="onNameChange($event)" />
                <button class='button' (click)="clickButton()">Find</button>`,
 		styleUrls: ["./css/search.css"]
})
export class Search{ 
    @Input() Title:string;
    @Output() TitleChange = new EventEmitter<string>();
    @Output() onCheckEnter = new EventEmitter<KeyboardEvent>();
    @Output() onclickButton= new EventEmitter();
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