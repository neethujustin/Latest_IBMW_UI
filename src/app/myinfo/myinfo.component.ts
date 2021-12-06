import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  User
} from '@app/_models';
import {
  AccountService,
  AlertService
} from '@app/_services';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import {
  first
} from 'rxjs/operators';
import {
  NgbDateStruct,
  NgbCalendar
} from '@ng-bootstrap/ng-bootstrap';
import {
  IDropdownSettings
} from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.less']
})
export class MyinfoComponent implements OnInit {

  //intialize variables
  isEditForm = false;
  user;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  editProfileForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  selectedItems = [];
  imageSrc: string;
  url = '';
  imagePath;
  message;
  primary = [];
  secondary = [];
  primarySkillArray = [];
  secondarySkillArray = [];
  skillsObject = {};
  skillsArray = [];
  primarySkillBoolean = true;
  dropdownListPrim = [];
  dropdownListSec = [];
  selectedPrimItems = []
  selectedSecItems = [];
  dropdownSettings: IDropdownSettings = {};
  currentLocation;
    projects = [];
    projectCommaSeparate;
    roles = [];
    formRole;
    data ={};
    skillSet = [];
    allPrimary = [];
    allSecondary = []
    allInfos;
    allGender = []; 
  //intialize variables end

  //get user details on constructor
  constructor(private accountService: AccountService,
      private modalService: NgbModal,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private alertService: AlertService) {
      // this.user = this.accountService.userValue;
      this.user ={
        "id": "61acbd7b5252c97827d14640",
        "firstName": "gyana",
        "middleName": "ranjan",
        "lastName": "patra",
        "email": "gyana@ust.com",
        "empId": 196039,
        "gender": "Male",
        "designation": {
            "id": "61ad9dd95252c97827d146da",
            "title": "System Analyst"
        },
        "mobileNo": 9853048728,
        "location": {
            "id": "61ad9dd95252c97827d146db",
            "name": "Bangalore"
        },
        "techRoles": [
            {
                "id": "61ad9dd95252c97827d146d6",
                "title": "Dev"
            },
            {
                "id": "61ad9dd95252c97827d146d7",
                "title": "Ops"
            }
        ],
        "projects": [
            {
                "pid": "61ad9dd95252c97827d146d8",
                "pname": "FHIR",
                "description": "FHIR Project",
                "status": true,
                "startdate": null,
                "enddate": null
            },
            {
                "pid": "61ad9dd95252c97827d146d9",
                "pname": "Health_Insight",
                "description": "Health_Insight Project",
                "status": false,
                "startdate": null,
                "enddate": null
            }
        ],
        "skillSets": [
            {
                "technology": "Spring Data",
                "skillCategory": "primary"
            },
            {
                "technology": "Spring sec",
                "skillCategory": "secondary"
            }
        ]
    }

    this.allInfos = {

        "commonInfo":{
        "locations":['Bangalore','Kochi','Trivandrum'],
        "skillSets": [
            {
                "technology": "Spring Data",
                "skillCategory": "primary"
            },
            {
                "technology": "Spring sec",
                "skillCategory": "secondary"
            },
            {
                "technology": "Angular",
                "skillCategory": "primary"
            },
            {
                "technology": "Javascript",
                "skillCategory": "secondary"
            }
        ]
    }
}
    this.allGender = ['Male','Female',"Others"]

  }


  ngOnInit(): void {

      this.id = this.user.id;
      this.isAddMode = !this.id;

      // password not required in edit mode
      const passwordValidators = [Validators.minLength(6)];
      if (this.isAddMode) {
          passwordValidators.push(Validators.required);
      }

      for(let k =0;k<this.user.projects.length;k++){
          this.projects.push(this.user.projects[k]['pname'])
      }
      for(let k =0;k<this.user.techRoles.length;k++){
        this.roles.push(this.user.techRoles[k]['title'])
    }

      this.getSelectedPrimnSec(); //get the primary secondary slected and all skills

      //initalise form controls
      this.editProfileForm = this.formBuilder.group({
          empId: ['', Validators.required],
          username: ['', Validators.required],
          techstack: ['', Validators.required],
          mobileNo: ['', Validators.required],
          gender: ['', Validators.required],
          project: ['', Validators.required],
          location: [this.user.location, Validators.required],
          selectedPrim: [this.selectedPrimItems],
          selectedSec: [this.selectedSecItems]



      });
  }

  //ngOnit ends

  // Function to get the primary secondary selected and all skills
  getSelectedPrimnSec() {
      this.dropdownListPrim = [];
      this.dropdownListSec = [];
      //retrieve selected primary skills
      for (let i = 0; i < this.user.skillSets.length; i++) {
          if(this.user.skillSets[i].skillCategory=='primary'){
              this.primary.push(this.user.skillSets[i].technology)
          }
          if(this.user.skillSets[i].skillCategory=='secondary'){
              this.secondary.push(this.user.skillSets[i].technology)
          }

      }
      
      for (var j = 0; j < this.primary.length; j++) {
        var obj = {};
        obj['skillId'] = j;
        obj['skill'] = this.primary[j];
        this.selectedPrimItems.push(obj);
    }
    for (var j = 0; j < this.secondary.length; j++) {
        var obj = {};
        obj['skillId'] = j;
        obj['skill'] = this.secondary[j];
        this.selectedSecItems.push(obj);
    }

      // //retrieve All skills
      for (let i = 0; i < this.allInfos.commonInfo.skillSets.length; i++) {

        if(this.allInfos.commonInfo.skillSets[i].skillCategory=='primary'){
            this.allPrimary.push(this.allInfos.commonInfo.skillSets[i].technology)
        }
        if(this.allInfos.commonInfo.skillSets[i].skillCategory=='secondary'){
            this.allSecondary.push(this.allInfos.commonInfo.skillSets[i].technology)
        }
    }

    console.log("allprim",this.allPrimary)
    console.log("allsec",this.allSecondary)

      for (var j = 0; j < this.allPrimary.length; j++) {
        var objDrop = {};
        objDrop['skillId'] = j;
        objDrop['skill'] = this.allPrimary[j];
        this.dropdownListPrim.push(objDrop);
    }
    for (var j = 0; j < this.allSecondary.length; j++) {
        var objDrop = {};
        objDrop['skillId'] = j;
        objDrop['skill'] = this.allSecondary[j];
        this.dropdownListSec.push(objDrop);
    }
    console.log(this.dropdownListPrim)
  }
  //function get the primary secondary slected and all skills ends


  //get the values of form fields using f
  get f() {
      return this.editProfileForm.controls;
  }



  //edit Form
  editForm() {
    this.isEditForm = true;
      this.selectedPrimItems = [];
      this.selectedSecItems = [];
      this.primary=[];
      this.secondary=[];
      this.allPrimary = [];
      this.allSecondary = [];
      // this.primarySkillBoolean = true;
      this.getSelectedPrimnSec();
      console.log( this.selectedPrimItems);
      
      this.dropdownSettings = {
          idField: 'skillId',
          textField: 'skill',
          allowSearchFilter: true,
          itemsShowLimit: 5,
          limitSelection: 5
      };


      this.editProfileForm.patchValue({
          empId: this.user.empId,
          username: this.user.email,
          techstack: this.roles.join(", "),
          mobileNo: this.user.mobileNo,
          project: this.projects.join(", "),
          gender: this.user.gender,
          location: this.user.location.name,
          selectedPrim: [this.selectedPrimItems],
          selectedSec: [this.selectedSecItems]


      });
  }

  //on  primary skill skill select on edit
  onItemSelectPrimary(item: any) {
      this.primary.push(item.skill);
  }

  //on  secondary skill skill select on edit
  onItemSelectSecondary(item: any) {
      this.secondary.push(item.skill);

  }

  //on  primary skill skill deselect on edit
  onItemDeSelectPrimary(item: any) {
      this.primary = this.primary.filter(el => el !== item.skill);

  }

  //on  primary skill skill deselect on edit
  onItemDeSelectSecondary(item: any) {
      this.secondary = this.secondary.filter(el => el !== item.skill);

  }


  //click on add Primary skill
  addPrimarySkill() {
      this.primarySkillBoolean = true;

  }

  //click on add secondary skill
  addSecondarySkill() {
      this.primarySkillBoolean = false;

  }
  //delete primary skill
  deletePrimarySkill(skill, i) {
      var id = "prim" + i
      this.selectedPrimItems = this.selectedPrimItems.filter(el => el.skill !== skill);
      document.getElementById(id).style.display = "none"
      this.editProfileForm.patchValue({

          selectedPrim: this.selectedPrimItems


      });
  }
  //delete secondary skill
  deleteSecondarySkill(secskill, j) {
      this.selectedSecItems = this.selectedSecItems.filter(el => el.skill !== secskill);
      var id = "sec" + j
      document.getElementById(id).style.display = "none"
      this.editProfileForm.patchValue({

          selectedSec: this.selectedSecItems


      });
  }

  onSubmit() {
      this.submitted = true;
    console.log(this.f)
    this.skillSet = [];
      for(let i=0;i<this.f.selectedPrim.value.length;i++){
          this.skillSet.push({"technology":this.f.selectedPrim.value[i].skill,"skillCategory": "primary"})
      }
      for(let i=0;i<this.f.selectedSec.value.length;i++){
        this.skillSet.push({"technology":this.f.selectedSec.value[i].skill,"skillCategory": "secondary"})
    }

      // stop here if form is invalid
      if (this.editProfileForm.invalid) {
          return;
      } else {
        this.alertService.success("Your changes are saved successfully")
        this.isEditForm = false;
        this.data = {
            "userInfo":{
                
                    "id": this.user.id,
                    "firstName":this.user.firstName,
                    "middleName": this.user.middleName,
                    "lastName": this.user.lastName,
                    "email": this.user.email,
                    "empId": this.user.empId,
                    "gender": this.f.gender.value,
                    "designation": this.user.designation.title,
                    "mobileNo": this.user.mobileNo,
                    "location": this.f.location.value.name,
                    "techRoles":this.f.techstack.value.split(", "),
                    "projects": this.user.projects,
                    "skillSets": this.skillSet
                }
            
        }

     }

  }

  //cancel edit
  cancelEdit() {
      this.isEditForm = false;

  }

  //open add Leave model
  openModal(targetModal, user) {
      this.modalService.open(targetModal, {
          centered: true,
          backdrop: 'static'
      });
  }


}