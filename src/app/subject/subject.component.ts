import { Component, OnInit, Input } from '@angular/core';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.sass']
})
export class SubjectComponent implements OnInit {
  @Input() subject;

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
  }

  private setVideo(e) {
    e.stopPropagation();
    this.subjectService.setVideo(this.subject);
  }
}
