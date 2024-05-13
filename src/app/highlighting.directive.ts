import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appHighlighting]",
})
export class HighlightingDirective {
  @Input("color") color;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  @HostBinding("class.colorify") isColorRed;
  @HostListener("click", ["$event"])
  onClick(event) {
    console.log(this.color);
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      "background-color",
      this.color
    );
    this.isColorRed = true;
  }
}
