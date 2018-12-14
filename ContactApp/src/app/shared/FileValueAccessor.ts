import { Directive, HostListener } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Directive({
    selector: "input[type=file]",
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: FileValueAccessor, multi: true}
    ]
})
export class FileValueAccessor implements ControlValueAccessor {
    @HostListener('change', ['$event.target.files']) onChange = (_) => {};
    @HostListener('blur') onTouched = () => {};

    writeValue(value) {}
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
}