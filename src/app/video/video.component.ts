import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { VgAPI } from 'videogular2/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.sass']
})
export class VideoComponent implements OnInit {

  @ViewChild("media") mediaElm;
  private api: VgAPI;
  private subject;
  private domain;
  private currentVideo = "";
  private isFullscreen = false;

  private subjectSub;
  private routeSub;
  private fsSub;

  constructor(private subjectService: SubjectService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subjectSub = this.subjectService.currentSubjectObs.subscribe(subject => {
      this.subject = subject;
      this.currentVideo = "";

      Observable.timer(10).subscribe(() => {  // To reset the video.
        this.currentVideo = this.subject.video.url;
      });
    });

    this.domain = "Math";
    // this.routeSub = this.route.params.subscribe(params => {
    //   if (params["domain"]) {
    //     this.domain = params["domain"];
    //   }
    // });
  }

  ngOnDestroy() {
    this.subjectSub.unsubscribe();
    //this.routeSub.unsubscribe();
    this.fsSub.unsubscribe();
  }

  private onPlayerReady(api: VgAPI) {
    this.api = api;

    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      this.nextVideo();
    });

    this.api.getDefaultMedia().subscriptions.canPlay.subscribe(() => {
      this.api.play();
    });

    this.fsSub = this.api.fsAPI.onChangeFullscreen.subscribe(isFS => {
      this.isFullscreen = isFS;
    });
  }

  private exitFullscreen() {
    this.api.fsAPI.toggleFullscreen();
  }

  private previousVideo() {
    this.subjectService.previousVideo();
  }

  private nextVideo() {
    this.subjectService.nextVideo();
  }

  private rewind() {
    this.api.seekTime(this.api.currentTime - 10);
  }

  private fastForward() {
    this.api.seekTime(this.api.currentTime + 10);
  }
}
