import { Observable, Subject, Subscription } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { ProjectService } from '../../../services/project.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../../../model/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {

  constructor(protected projectService: ProjectService) { }

  public projectList: Observable<Project[]> = null;
  public searchComplete: boolean = false;
  public isCollectionEmpty: boolean = false;

  public filterSubscription: Subscription;
  public filterSubject: Subject<string> = new Subject<string>();

  ngOnInit() {

    this.filterSubscription = this.filterSubject
      .asObservable().pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(term => new Observable<string>((observer) => observer.next(term)))
      )
      .subscribe((term) => this.filter(term));

    this.search();
  }

  ngOnDestroy() {
    if (this.filterSubscription !== undefined) {
      this.filterSubscription.unsubscribe();
      this.filterSubscription = undefined;
    }
  }

  public search(): void {
    this.searchComplete = false;
    this.projectList = this.projectService.listProjects({}).pipe(
      tap(res => {
        this.searchComplete = true;
        this.isCollectionEmpty = res.length === 0;
      })
    );
  }

  public filter(term: string): void {
    this.projectList = this.projectService.searchProjects(term);
  }

  public insertInitialRecords(): void {
    this.projectService.createInitialRecords().subscribe(res => {
      if (res.success) {
        this.search();
      }
      else { /*TODO:*/ }
    });
  }

  public DeleteProject(code: string) {
    this.projectService.deleteProject(code).subscribe(res => {
      if (res.success) {
        this.search();
      }
      else { /*TODO:*/ }
    });
  }
}
