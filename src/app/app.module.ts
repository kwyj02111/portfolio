import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

/*service*/
import { AppStateService } from './_services/index';

/*component*/
import { AppComponent } from './app.component';
import { HeaderComponent } from './_components/index';
import { DockComponent } from './_components/index';
import { HomeComponent } from './_components/index';
import { ProjectComponent } from './_components/index';
import { WorkExperienceComponent } from './_components/index';
import { IntroduceComponent } from './_components/index';
import { TerminalComponent } from './_components/index';
import { ContactComponent } from './_components/index';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        DockComponent,
        HomeComponent,
        ProjectComponent,
        WorkExperienceComponent,
        IntroduceComponent,
        TerminalComponent,
        ContactComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
    ],
    providers: [
        AppStateService,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
