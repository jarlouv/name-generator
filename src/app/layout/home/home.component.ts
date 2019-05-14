import { Component, OnInit } from '@angular/core';
import { ProfileExt } from 'src/app/models';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public profileExts: Array<ProfileExt>;
  public loading = false;
  gridStyle ={
    width: '33.33%',
    textAlign: 'center'
  };

  constructor(private profileSvc: ProfileService) { }

  ngOnInit() {
  }

  changesInGeneratedNames($event): void {
    this.profileExts = $event;
  }

  loadingNames($event): void {
    if ($event > 0) {
      this.loading = true;
      this.profileExts = new Array($event);
    } else if($event == -1) {
      this.profileExts = null;
      this.loading = false;
    } else {
      this.loading = false;
    }
  }

}
