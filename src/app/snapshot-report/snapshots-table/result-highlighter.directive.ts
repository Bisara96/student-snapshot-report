import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appResultHighlighter]'
})
export class ResultHighlighterDirective implements OnInit{

  @Input('appResultHighlighter') result: number = 100;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.highlightResult(this.el);
  }

  highlightResult(el: ElementRef<HTMLSpanElement>) {
    let color = 'black';

    switch (true) {
      case this.result > 90:
        color = '#76ff03';
        break;
      case this.result > 80:
        color = '#ffab00';
        break;
      case this.result > 60:
        color = '#ff6d00';
        break;
      default:
        color = '#dd2c00';
        break;
    }

    el.nativeElement.style.color = color;

    el.nativeElement.innerText = `${this.result}%`;
  }

}
