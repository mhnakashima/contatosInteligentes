import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../api/user';
import { UtilsService } from '../../utils/utils.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public users$: User[];
  public favorites: User[] = [];
  public searchString: string = '';
  public orderFieldBy = '';
  public orderItem: boolean = true;
  public orderByItem: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UtilsService
  ) { }

  ngOnInit() {
    this.initComponent();
  }

  private async initComponent():Promise<void> {
    //this.searchString = this.activatedRoute.snapshot.paramMap.get('name') || '';
    this.users$ = <User[]>await this.userService.getUsers().toPromise();
    this.favorites = this.userService.getFavorites();
  }

  public addFavorite(user: User): void {

    user.active = !user.active;

    if (user.active) {

      if (this.validateRepeatUser(user)) {
        this.favorites.push(user);
      }
    } else {
      let arr = this.favorites;
      this.favorites = arr.filter((item, index) => {
        return item.shortName.toLowerCase() !== user.shortName.toLowerCase();
      })
    }

    this.userService.setFavorites(this.favorites);
  }

  public onSearchItem(): void {
    this.router.navigate(['/view', this.searchString]);
  }

  private validateRepeatUser(user: User): boolean {
    let value = null;
    value = (this.favorites.find(item => item.shortName == user.shortName));
    return value == null;
  }

  public orderBy(field: string): void {

    if (field == 'name') {
      this.orderByItem = true;
      this.users$.sort((a, b) => this.compare(a, b));
    }

    if (field == 'date') {
      this.orderByItem = false;
      this.users$.sort((a, b) => this.compareDate(a, b));
    }
  }

  public compare(a: User, b: User): number {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  public compareDate(a: User, b: User): number {
    return Number(new Date(b.created)) - Number(new Date(a.created));
  }

  public setArrange(mode: string): void {
    this.orderItem = mode == 'card';
  }
}
