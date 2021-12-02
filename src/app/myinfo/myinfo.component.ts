import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/_models';
import { AccountService, AlertService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.less']
})
export class MyinfoComponent implements OnInit {

  isEditForm=false;
  user;
  editProfileForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  selectedItems=[];
  skillSet = [];
  imageSrc:string;
  url='';
  imagePath;
  message;
  primarySkillArray = [];
  secondarySkillArray = [];
  skillsObject = {};
  skillsArray = [];
  primarySkillBoolean = true;
  dropdownListPrim = [];
  dropdownListSec = [];

  selectedPrimItems = []
  selectedSecItems = [];
  dropdownSettings:IDropdownSettings={};

  constructor(private accountService: AccountService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) {
    // this.user = this.accountService.userValue;
    this.user = {
      "username": "test5",
      "techstack": "Devops",
      "mobileNo": "xxxxxxxxx",
      "empId": "3232",
      "gender":"male",
      "project":"FHIR",
      "skills" : [{
        "primary_skills":["Angular", "Java"],
        "Secondary_skills":["NodeJs", "Hibernate", "Springboot"]
        }],
        "allSkills" : [{
          "primary_skills":["Angular", "Java","micro"],
          "Secondary_skills":["NodeJs", "Hibernate", "Springboot"]
          }],
            "location":"Banglore"
  }
    console.log(this.user)
  }
  ngOnInit(): void {

    this.id = this.user.id;
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.getSelectedPrimnSec();
    this.editProfileForm = this.formBuilder.group({
      empId: ['', Validators.required],
      username: ['', Validators.required],
      techstack: ['', Validators.required],
      mobileNo: ['', Validators.required],
      gender: ['', Validators.required],
      project:['', Validators.required],
      skills:['', Validators.required],
      location:['', Validators.required],
      selectedPrim:[this.selectedPrimItems],
      selectedSec:[this.selectedSecItems]



    });

    this.skillSet = this.user.skills;
    console.log(this.skillSet)
  }

  getSelectedPrimnSec(){
        //retrieve selected primary skills
        for(let i=0;i<this.user.skills.length;i++){
          this.primarySkillArray = this.user.skills[i]['primary_skills'];
          this.secondarySkillArray = this.user.skills[i]['Secondary_skills'];
          for(var j=0;j<this.user.skills[i]['primary_skills'].length;j++){
            var obj = {};
            obj['skillId']=j;
            obj['skill'] = this.user.skills[i]['primary_skills'][j];
            this.selectedPrimItems.push(obj);
          }
          for(var j=0;j<this.user.skills[i]['Secondary_skills'].length;j++){
            var obj = {};
            obj['skillId']=j;
            obj['skill'] = this.user.skills[i]['Secondary_skills'][j];
            this.selectedSecItems.push(obj);
          }
        }
    
        // //retrieve All skills
        for(let i=0;i<this.user.allSkills.length;i++){
          console.log(this.user.allSkills[i]['primary_skills'])
          for(var j=0;j<this.user.allSkills[i]['primary_skills'].length;j++){
            var objDrop = {};
            objDrop['skillId']=j;
            objDrop['skill'] = this.user.allSkills[i]['primary_skills'][j];
            this.dropdownListPrim.push(objDrop);
          }
          for(var j=0;j<this.user.allSkills[i]['Secondary_skills'].length;j++){
            var objDrop = {};
            objDrop['skillId']=j;
            objDrop['skill'] = this.user.allSkills[i]['Secondary_skills'][j];
            this.dropdownListSec.push(objDrop);
          }
        }
  }
  get f() { return this.editProfileForm.controls; }


  //edit Form
  editForm(){
    this.selectedPrimItems = [];
    this.selectedSecItems = [];
    // this.primarySkillBoolean = true;
    this.getSelectedPrimnSec();
    this.dropdownSettings = {
      idField: 'skillId',
      textField: 'skill',
    };

  
    this.isEditForm = true;
    this.editProfileForm.patchValue({
      empId: this.user.empId,
      username: this.user.username,
      techstack: this.user.techstack,
      mobileNo: this.user.mobileNo,
      project: this.user.project,
      skills: this.user.skills,
      location: this.user.location,
     

    });
  }

  //on skill select on edit

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    if(this.primarySkillBoolean = true){
    this.primarySkillArray.push(item.skill);
    }
  }

  //click on add Primary skill

  addPrimarySkill(){
    this.primarySkillBoolean = true;

  }

//click on add secondary skill
addSecondarySkill(){
  this.primarySkillBoolean = false;
  
}
//delete primary skill

deletePrimarySkill(skill,i){
  console.log(skill)
  var id= "prim"+i
  this.selectedPrimItems = this.selectedPrimItems.filter( el => el.skill !== skill );
  document.getElementById(id).style.display="none"
  console.log(this.selectedPrimItems)
  this.editProfileForm.patchValue({

    selectedPrim: this.selectedPrimItems


  });
}

deleteSecondarySkill(secskill,j){
  this.selectedSecItems = this.selectedSecItems.filter( el => el.skill !== secskill );
  var id="sec"+j
  document.getElementById(id).style.display="none"
  this.editProfileForm.patchValue({

    selectedSec: this.selectedSecItems


  });
}

  onSubmit() {
    
    console.log(this.f)
    // this.isEditForm = false;
    // stop here if form is invalid
    if (this.editProfileForm.invalid) {
        return;
    }
    
}

  
}
