import { Directive, HostListener, ElementRef } from '@angular/core';
@Directive({
  selector: '[appCnicNumberMask]',
})
export class CnicNumberMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent): void {
    const input = this.el.nativeElement;
    
    // Remove any non-numeric characters
    let value = input.value.replace(/\D/g, '');

    // Apply formatting for 5-7-1 pattern
    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5);
    }
    if (value.length > 13) {
      value = value.slice(0, 13) + '-' + value.slice(13);
    }

    // Set the formatted value back to the input
    input.value = value;
  }
}
