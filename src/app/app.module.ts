import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*component*/
import { AppComponent } from './app.component';
import { HeaderComponent } from './_components/index';
import { DockComponent } from './_components/index';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        DockComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
