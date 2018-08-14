import { ProjectService } from '../../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../model/project.model';
import { OperationResult } from '../../../model/operationresult.model';
import * as moment from 'moment';

@Component({
  selector: 'app-project-form',
  templateUrl: './project.form.component.html',
  styleUrls: ['./project.form.component.css']
})
export class ProjectFormComponent implements OnInit {

  constructor(protected projectService: ProjectService, protected route: ActivatedRoute, protected router: Router) { }

  public record: Project = null;
  public hasError: boolean = false;
  public errorMessage: string = null;

  ngOnInit() {
    this.identifyRecord();
  }

  public identifyRecord(): void {
    // Record Id is not present on the URL
    if (this.route.snapshot.params.id === undefined) {
      this.router.navigateByUrl('/project');
    }
    // Its a New Record, lets initialize it
    else if (this.route.snapshot.params.id === 'new') {
      this.record = new Project();
    }
    // Record Id is on the URL, lets fetch
    else {
      this.projectService.getProject(this.route.snapshot.params.id).subscribe((res: Project) => {
        if (res !== undefined) {
          this.record = res;
        }
        else { this.router.navigateByUrl('/project'); }
      });
    }
  }

  public setFormError(hasError: boolean, errorMessage?: string): void {
    this.hasError = hasError;
    this.errorMessage = errorMessage;
  }

  public saveRecord(): void {
    if (this.record !== undefined) {
      if (this.record.name === undefined) { this.setFormError(true, 'The project name is required'); return; }
      if (this.record.author === undefined) { this.setFormError(true, 'The project author is required'); return; }
      if (this.record.creationDate === undefined) { this.record.creationDate = moment().toDate(); }
      this.setFormError(false);

      const action = this.record.code === undefined ?
        this.projectService.createProject(this.record) :
        this.projectService.updateProject(this.record);

      action.subscribe((res: OperationResult) => {
        if (res.success) {
          this.router.navigateByUrl('/project');
        }
        else { this.setFormError(true, res.message); }
      });
    }
  }
}

