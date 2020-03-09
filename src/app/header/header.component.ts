import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subs : Subscription ;
  isAuthenticated = false ;

  constructor(private datastorageservice : DataStorageService, private authservice : AuthService) { }

  ngOnInit() {
   this.subs = this.authservice.user.subscribe(user => {
    this.isAuthenticated = !!user ; // !user ? false : true
   });
  }

  onAddData(){
    this.datastorageservice.storeRecipes();
  }
  onFetchData(){
    this.datastorageservice.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authservice.logout();
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
