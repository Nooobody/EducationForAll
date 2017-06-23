import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from "rxjs";
import { Http } from "@angular/http";
import { iBranch, iSubject } from '../domain.interface';
import { domainMock } from '../domain.mock';

@Injectable()
export class SubjectService {

  private branches: iBranch[] = [];
  private currentSubject = new Subject<iSubject>();
  public currentSubjectObs = this.currentSubject.asObservable();

  private branchesSrc = new Subject<iBranch[]>();
  public branchesObs = this.branchesSrc.asObservable();

  constructor(private http: Http) {
  }

  public getBranches(domain) {  // This should make a http call.
    Observable.timer(10).subscribe(() => {  // For mocking purposes.
      this.processBranches(domainMock[domain]);
    });
  }

  public setVideo(setSubject) {
    for (let branch of this.branches) {
      let currentBranch = false;
      for (let subject of branch.subjects) {
        if (subject.name === setSubject.name && subject.branch === setSubject.branch) {
          subject.current = true;
          branch.open = true;
          currentBranch = true;
        }
        else {
          subject.current = false;
          if (!currentBranch) {
            branch.open = false;
          }
        }
      }
    }

    this.updateBranches();
    this.currentSubject.next(setSubject);
  }

  public nextVideo() {
    let isNext;
    for (let ibranch = 0; ibranch < this.branches.length; ibranch++) {
      let branch = this.branches[ibranch];
      for (let isubject = 0; isubject < branch.subjects.length; isubject++) {
        let subject = branch.subjects[isubject];
        if (subject.current) {
          if (!subject.completed) {
            subject.completed = true;
            branch.completed += 1;
          }
          if (isubject < branch.subjects.length - 1) {
            subject.current = false;
            branch.subjects[isubject + 1].current = true;
            isNext = branch.subjects[isubject + 1];
            break;
          }
          else {
            if (ibranch < this.branches.length - 1 && this.endOfSection()) {
              subject.current = false;
              this.branches[ibranch + 1].subjects[0].current = true;
              isNext = this.branches[ibranch + 1].subjects[0];
              break
            }
            else {
              return;
            }
          }
        }
      }

      if (isNext) {
        break;
      }
    }

    if (isNext) {
      this.setVideo(isNext);
    }
  }

  public previousVideo() {
    let isNext;
    for (let ibranch = 0; ibranch < this.branches.length; ibranch++) {
      let branch = this.branches[ibranch];
      for (let isubject = 0; isubject < branch.subjects.length; isubject++) {
        let subject = branch.subjects[isubject];
        if (subject.current) {
          if (isubject > 0) {
            subject.current = false;
            branch.subjects[isubject - 1].current = true;
            isNext = branch.subjects[isubject - 1];
            break;
          }
          else {
            if (ibranch > 0) {
              subject.current = false;
              let prevBranch = this.branches[ibranch - 1];
              this.branches[ibranch - 1].subjects[prevBranch.subjects.length - 1].current = true;
              isNext = this.branches[ibranch - 1].subjects[prevBranch.subjects.length - 1];
              break
            }
            else {
              return;
            }
          }
        }
      }

      if (isNext) {
        break;
      }
    }

    if (isNext) {
      this.setVideo(isNext);
    }
  }

  private endOfSection() {
    return confirm("You have completed this section!\r\nDo you want to continue to the next section?");
  }

  private processBranches(branches) {
    let branchIndex = 1;
    for (let branch of branches) {
      let completed = 0;
      let subjectIndex = 1;
      for (let subject of branch.subjects) {
        subject.branch = branch.name;
        subject.index = subjectIndex;
        subject.branchIndex = branchIndex;
        subjectIndex += 1;
        if (subject.completed) {
          completed += 1;
        }
      }
      branch.completed = completed;
      branch.amount = branch.subjects.length;
      branch.index = branchIndex;
      branchIndex += 1;
    }

    this.branches = branches;
    this.updateBranches();
  }

  private updateBranches() {
    this.branchesSrc.next(this.branches);
  }
}
