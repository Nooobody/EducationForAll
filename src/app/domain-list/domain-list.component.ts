import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { iBranch } from '../domain.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.sass']
})
export class DomainListComponent implements OnInit {

  private branches: iBranch[] = [];
  private initial = true;

  private routeSub;
  private branchSub;

  constructor(private subjectService: SubjectService, private changeDetector: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      if (params["domain"]) {
        this.subjectService.getBranches(params["domain"]);
      }
    });

    this.branchSub = this.subjectService.branchesObs.subscribe(branches => {
      this.branches = branches;

      if (this.initial) {
        this.initial = false;
        this.subjectService.setVideo(this.branches[0].subjects[0]);
      }
      else {
        this.changeDetector.detectChanges();
      }
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.branchSub.unsubscribe();
  }
}
