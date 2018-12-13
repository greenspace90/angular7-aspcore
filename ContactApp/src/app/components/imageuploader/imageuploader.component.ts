import { Component } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadService } from '@app/_services/';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-imageuploader',
  templateUrl: './imageuploader.component.html',
  styleUrls: ['./imageuploader.component.css']
})
export class ImageuploaderComponent {
  public imagePath;
  imgURL: any;
  public progress: number;
  public message: string;
  // uploadReq: Observable<Response>;
  
  constructor(private http: HttpClient, private _uploadService: UploadService) { }

  preview(files) {
    if (files.length === 0)
      return;

    console.log(files[0].name);

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  upload() {
    if (this.imagePath.length === 0)
      return;

    const formData = new FormData();

    for (let file of this.imagePath)
      formData.append(file.name, file);

    //  this.uploadReq = this._uploadService.upload('api/upload', formData);
    const uploadReq = new HttpRequest('POST', `api/upload`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }
}
