import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../model/project.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OperationResult } from '../model/operationresult.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl: string = 'http://localhost:3000/project';

  public listProjects(query: any): Observable<Project[]> {
    return this.http.post<OperationResult>(`${this.apiUrl}/all`, query).pipe(
      map(res => res.data as Project[])
    );
  }

  public searchProjects(term: string): Observable<Project[]> {
    return this.http.post<OperationResult>(`${this.apiUrl}/like`, { text: term }).pipe(
      map(res => res.data as Project[])
    );
  }

  public createInitialRecords(): Observable<OperationResult> {
    return this.http.post<OperationResult>(`${this.apiUrl}/setup`, { });
  }

  public getProject(code: string): Observable<Project> {
    return this.http.get<OperationResult>(`${this.apiUrl}/${code}`).pipe(
      map(res => res.data as Project)
    );
  }

  public createProject(record: Project): Observable<OperationResult> {
    return this.http.put<OperationResult>(`${this.apiUrl}/new`, record);
  }

  public updateProject(record: Project): Observable<OperationResult> {
    return this.http.patch<OperationResult>(`${this.apiUrl}/${record.code}`, record);
  }

  public deleteProject(code: string): Observable<OperationResult> {
    return this.http.delete<OperationResult>(`${this.apiUrl}/${code}`);
  }
}
