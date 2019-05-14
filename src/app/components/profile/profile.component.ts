import { Component, OnInit, Input } from '@angular/core';
import { ProfileExt } from 'src/app/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  @Input() profileExt: ProfileExt;
  @Input() loading: boolean;

  constructor() { }

  ngOnInit() {
  }

  hasKey(key):boolean{
    return this.profileExt != null && key in this.profileExt ;
  }

}
