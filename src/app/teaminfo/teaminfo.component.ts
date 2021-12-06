import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService ,AlertService} from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teaminfo',
  templateUrl: './teaminfo.component.html',
  styleUrls: ['./teaminfo.component.less']
})
export class TeaminfoComponent implements OnInit {
  users;
  totalSize;
  page = 1;
  pageSize =2;
  public isCollapsed = false;

  constructor(private accountService: AccountService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.accountService.getAll()
    .pipe(first())
    .subscribe(users => 
        {
            this.users = users
            console.log(this.users)
            this.totalSize = this.users.length;
        });
  }

  clicked(i){
    var id="details"+i
    document.getElementById(id).style.visibility ="visible"
    
  }
 

}
