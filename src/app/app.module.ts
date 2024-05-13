import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormComponentComponent } from "./dynamic-form-component/dynamic-form-component.component";
import { HighlightingDirective } from './highlighting.directive';

@NgModule({
  declarations: [AppComponent, DynamicFormComponentComponent, HighlightingDirective],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
