import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        DockComponent,
        HomeComponent,
        ProjectComponent,
        WorkExperienceComponent,
        IntroduceComponent,
    ],
    imports: [
        BrowserModule
    ],
    providers: [
        AppStateService,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
