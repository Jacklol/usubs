import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'search',
    template: `
                <input [(ngModel)]="title"  placeholder="enter request" (keyup)="checkEnter($event)"
				        (ngModelChange)="onNameChange($event)" />
                <button class='button' (click)="clickButton()">Find</button>`,
    styleUrls: ["./css/search.css"]
})
export class Search {
    @Input() title: string;
    @Output() titleChange = new EventEmitter<string>();
    @Output() onClickButton = new EventEmitter();
    onNameChange(model: string) {
        this.title = model;
        this.titleChange.emit(model);
    }
    checkEnter(e: KeyboardEvent) {
        if (e.keyCode == 13) {
            this.clickButton();
        }
    }
    clickButton() {
        this.onClickButton.emit();
    }
}