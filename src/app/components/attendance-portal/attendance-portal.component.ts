import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';
import Swal from 'sweetalert2';
import qrcodeParser from "qrcode-parser";
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-attendance-portal',
  templateUrl: './attendance-portal.component.html',
  styleUrls: ['./attendance-portal.component.css']
})
export class AttendancePortalComponent implements OnInit {
    userData : any = {
      lat : "",
      long : "",
      ip : "",
      inTime : "-",
      outTime : "-",
      punchIn : false
    };
    // qrCodeValue : any = "";
    notificationPermission : boolean = false;
    locationPermission : boolean = true;
    showDetails : boolean = false;
    title = 'attendanceModule';
    constructor(private http: HttpClient, private attendanceService: AttendanceService, private messagingService: MessagingService){}
  
    ngOnInit(): void {
      this.getIp();
      this.getNotification();
      this.getLocation();
      this.messagingService.receiveMessage();
      // this.getQr();
    }
  
    getLocation() : void {
      let _self = this;
      navigator.geolocation.getCurrentPosition(function(location){
        if(location.coords){
          _self.userData.lat = location.coords.latitude;
          _self.userData.long = location.coords.longitude;
          _self.locationPermission = true;
        }else{
          _self.locationPermission = false;
        }
        
      })
    }
    
    getNotification() : void {
      let _self = this;
      this.messagingService.requestPermission().subscribe(
        (token : any) => {
          console.log("User Web Token: " + token);
          _self.notificationPermission = true;
        },
        (err : any) => {
          console.error('Unable to get permission to notify.', err);
          _self.notificationPermission = false;
        }
      );
    }
  
    getIp() : void {
      this.http.get("https://api.ipify.org?format=json").toPromise().then((data : any) => {
        this.userData.ip = data.ip;
      })
    }
  
    // getQr() : void {
    //   let qrCodeBase64Str = "data:image/png;base64,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";
    //   qrcodeParser(qrCodeBase64Str).then((res : any) => {
    //     this.qrCodeValue = res.split(":")[1];
    //     console.log("QR CODE value is = " + res.split(":")[1]);
    //   });
    // }
  
    calcuateDistanceWithBaseLocation(baseLocation : any, currentLocation : any){
      let baseXCoordinate = baseLocation.latitude;
      let baseYCoordinate = baseLocation.longitude;
      let currentXCoordinate = currentLocation.latitude;
      let currentYCoordinate = currentLocation.longitude;
      return (Math.sqrt(Math.abs((baseXCoordinate - currentXCoordinate)**2 + (baseYCoordinate - currentYCoordinate)**2)) * 100000).toFixed(2); 
    }

    markAttendance() : void {
      let baseLocation = {
        latitude: 26.871894,
        longitude: 75.775233 
      }
      let currentLocation = {
        latitude: this.userData.lat,
        longitude: this.userData.long
      }
      let distanceFromBase = this.calcuateDistanceWithBaseLocation(baseLocation,currentLocation);
      if(this.notificationPermission && this.locationPermission && distanceFromBase <= "50"){
        
        console.log(this.calcuateDistanceWithBaseLocation(baseLocation,currentLocation) + " m");
        this.userData.punchIn = !this.userData.punchIn;
        this.showDetails = true;
        if(this.userData.punchIn){
          this.userData.inTime = new Date();
        }else{
          this.userData.outTime = new Date();
        }
        this.attendanceService.markAttendance(this.userData).then((res: any) => {
          console.log(res);
          
          if(res.status){
            Swal.fire({
              title: "Success",
              text: res.msg,
              icon: 'success',
              showCloseButton: true
            }).then(() => {
            })
          }else{
            this.userData.punchIn = !this.userData.punchIn;
            this.userData.inTime = "-";
            this.userData.outTime = "-";
          }
        }).catch((err : any) => {
          Swal.fire({
            title: "Error",
            text: err.message,
            icon: "error",
            showCloseButton: true
          }).then(() => {
            this.userData.punchIn = !this.userData.punchIn;
            this.userData.inTime = "-";
            this.userData.outTime = "-";
          })
        })
      }else if(!this.notificationPermission){
        Swal.fire({
          title: "Caution",
          text: "Notification Permission is Blocked.Please Give that permission.",
          icon: "error",
          showCloseButton: true
        }).then(() => {
        })
      }else if(distanceFromBase > "50"){
        Swal.fire({
          title: "Caution",
          text: "Attendance can't marked because You are " + distanceFromBase + "m away from Base location.",
          icon: "error",
          showCloseButton: true
        }).then(() => {})
      }else{
        Swal.fire({
          title: "Caution",
          text: "Location Permission is Blocked.Please Give that permission.",
          icon: "error",
          showCloseButton: true
        }).then(() => {
        })
      }
      
    }
  
  

}
