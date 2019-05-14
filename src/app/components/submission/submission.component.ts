import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileExt } from 'src/app/models';
import { TestdataService } from 'src/app/services/testdata.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.less']
})
export class SubmissionComponent implements OnInit {
  submissionForm: FormGroup;
  public genders: Array<string>;
  public regions: Array<string>;
  @Output() generateNames = new EventEmitter<Array<ProfileExt>>();
  @Output() loadingNames = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder,
    private profileSrvc: ProfileService,
    private testdataSrvc: TestdataService) { }

  ngOnInit() {
    this.submissionForm = this.formBuilder.group({
      gender: [null, Validators.required],
      region: [null, Validators.required],
      numNames: [1, Validators.required]
    });

    this.testdataSrvc.getGenders().then(result => {
      this.genders = result;
    });

    this.testdataSrvc.getRegions().then(result => {
      this.regions = result;
    });
  }

  submitForm(): void {
    this.generateTheNames();
  }

  generateTheNames(): void {
    const numNames: number = this.submissionForm.controls['numNames'].value == null ? 1 : this.submissionForm.controls['numNames'].value;
    this.loadingNames.emit(numNames);

    this.profileSrvc.getProfileList(numNames,
      this.submissionForm.controls['gender'].value,
      this.submissionForm.controls['region'].value)
        .then(result => {
          this.generateNames.emit(result.splice(0, numNames));
          this.loadingNames.emit(0);
        })
        .catch(error => {
          this.retrieveFromJSONList(numNames);
        });
  }

  clearForm(): void {
    this.submissionForm.reset();
    this.loadingNames.emit(-1);
    this.submissionForm.controls['numNames'].setValue(1);
  }

  private retrieveFromJSONList(numNames: number): void {
    this.profileSrvc.getProfileExtListTestData(
      this.submissionForm.controls['gender'].value,
      this.submissionForm.controls['region'].value)
        .then(result => {
          this.generateNames.emit(result.splice(0, numNames));
          this.loadingNames.emit(0);
        });
  }

}
