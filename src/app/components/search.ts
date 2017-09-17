import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'search',
    template: `
                <input [(ngModel)]="Title"  placeholder="enter request" (keyup)="checkEnter($event)"
				        (ngModelChange)="onNameChange($event)" />
                <button class='button' (click)="clickButton()">Find</button>`,
    styleUrls: ["./css/search.css"]
})
export class Search {
    @Input() Title: string;
    @Output() TitleChange = new EventEmitter<string>();
    @Output() onclickButton = new EventEmitter();
    onNameChange(model: string) {
        this.Title = model;
        this.TitleChange.emit(model);
    }
    checkEnter(e: KeyboardEvent) {
        if (e.keyCode == 13) {
            this.clickButton();
        }
    }
    clickButton() {
        this.onclickButton.emit();
    }
}