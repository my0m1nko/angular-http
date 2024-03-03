import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './interface/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: User[];
  title = 'angularhttp';
  private user: any = {
    'id': 2,
    'name': 'Junior Graham',
    'username': 'junior',
    'email': 'junior@april.biz'
  };

  fileStatus = { status: '', percentage: 0 };

  constructor(private userService: UserService) {}

  
  ngOnInit(): void {
    //this.onUpdateUser();
    //this.onPatchUser();
    this.onGetUsers();
    this.onGetUser();
    //this.onCreateUser();
    //this.onDeleteUser();
    // this.onTextFile();
  }

  onGetUsers(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        console.log(response);
        this.users = response;
      },
      (error: any) => console.log(error),
      () => console.log('Done getting users')
    );
  }

  onGetUser(): void {
    this.userService.getUser().subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting user')
    );
  }

  onCreateUser(): void {
    this.userService.createUser(this.user).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done creating user')
    );
  }

  onUpdateUser(): void {
    this.userService.updateUser(this.user).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done updating user')
    );
  }

  onPatchUser(): void {
    this.userService.patchUser(this.user).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done patching user')
    );
  }

  onDeleteUser(): void {
    this.userService.deleteUser(5).subscribe(
      (response) => console.log('Response from delete: ', response),
      (error: any) => console.log(error),
      () => console.log('Done deleting user')
    );
  } 
  
  onTextFile(): void {
    this.userService.getTextFile().subscribe(
      (response) => console.log('Response: ', response),
      (error: any) => console.log(error),
      () => console.log('Done getting text file')
    );
  } 

  onUploadFile(files: File[]): void {
    console.log(files);
    const formData = new FormData();
        for (const file of files) {
            formData.append('files', file, file.name);
        }
    this.userService.uploadFiles(formData).subscribe(
      (event) => {
        switch (event.type) {
        case HttpEventType.UploadProgress || HttpEventType.DownloadProgress:
          console.log(event);
          this.fileStatus.percentage = Math.round(100 * event.loaded / event.total);
          this.fileStatus.status = 'progress';
          console.log(this.fileStatus);
          break;
        case HttpEventType.Response:
          console.log(event);
          if (event.status === 200) {
            console.log(event);
            this.fileStatus.status = 'done';
            this.fileStatus.percentage = 0;
            console.log(this.fileStatus);
            break;
          } else {
            console.log(event);
            this.fileStatus.status = 'done';
            this.fileStatus.percentage = 0;
            break;
          }
        default:
        // Clean up here;
      }
        
      },
      (error: any) => console.log(error),
      () => console.log('Done uploading files')
    );
  }

}
