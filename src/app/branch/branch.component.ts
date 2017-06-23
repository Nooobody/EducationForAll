import { Component, OnInit, Input } from '@angular/core';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.sass']
})
export class BranchComponent implements OnInit {
  @Input() branch;

  private open = false;
  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.checkCurrent();
    this.subjectService.branchesObs.subscribe(branches => {
      this.checkCurrent();
    })
  }

  private checkCurrent() {
    if (this.branch.open) {
      this.open = true;
    }
  }

  private toggle(e) {
    e.stopPropagation();
    this.open = !this.open;
  }
}
