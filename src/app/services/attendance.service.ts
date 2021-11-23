import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  markAttendance(userData : any) : Promise<Object> {
    let header = new HttpHeaders({"ipAddress" : userData.ip});
    return this.http.post(environment.apiBaseUrl + "mark-attendance" , userData, {headers : header}).toPromise();
  }
}
