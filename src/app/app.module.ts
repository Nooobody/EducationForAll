import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SubjectService } from './services/subject.service';

import { AppComponent } from './app.component';
import { SubjectComponent } from './subject/subject.component';
import { BranchComponent } from './branch/branch.component';
import { VideoComponent } from './video/video.component';
import { DomainListComponent } from './domain-list/domain-list.component';
import { SearchComponent } from './search/search.component';
import { VideoWrapperComponent } from './video-wrapper/video-wrapper.component';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

@NgModule({
  declarations: [
    AppComponent,
    SubjectComponent,
    BranchComponent,
    VideoComponent,
    DomainListComponent,
    SearchComponent,
    VideoWrapperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    RouterModule.forRoot([
      { path: '', component: SearchComponent },
      { path: ':domain', component: VideoWrapperComponent }
    ])
  ],
  providers: [
    SubjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
