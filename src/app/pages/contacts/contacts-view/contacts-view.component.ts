import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../api/user';
import { UtilsService } from '../../../utils/utils.service';

@Component({
  selector: 'app-contacts-view',
  templateUrl: './contacts-view.component.html',
  styleUrls: ['./contacts-view.component.scss']
})
export class ContactsViewComponent implements OnInit {

  public searchString = '';
  private users$: User[];
  public user: any = new User();

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UtilsService
  ) { }

  ngOnInit() {
    this.initComponent();
  }

  private async initComponent(): Promise<void> {
    this.searchString = this.activatedRoute.snapshot.paramMap.get('name') || '';


    if (this.searchString !== "") {

      this.users$ = <User[]>await this.userService.getUsers().toPromise();

      this.user = this.users$.filter((value) => {
        return value.name.toLowerCase() === this.searchString.toLowerCase();
      })[0];

      console.log(this.user);
    }
  }
}
