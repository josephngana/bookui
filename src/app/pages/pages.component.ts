import {Component, OnInit} from '@angular/core';

import {MENU_ITEMS} from './pages-menu';
import {NbMenuItem} from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {

  isLoggedIn: boolean;

  menu: NbMenuItem[];
  // management menus
  mgtMenuGroup: NbMenuItem;
  roleMgtMenu: NbMenuItem;
  userMgtMenu: NbMenuItem;
  siteMgtMenu: NbMenuItem;
  bookMgtMenu: NbMenuItem;
  multimediaMgtMenu: NbMenuItem;

  // personal menus
  personalMenuGroup: NbMenuItem;
  authMenu: NbMenuItem;
  profileMenu: NbMenuItem;

  ngOnInit(): void {
    this.isLoggedIn = true;
    this.menu = MENU_ITEMS;
    let start = 3;
    this.mgtMenuGroup = this.populateMgtMenuGroup();
    this.roleMgtMenu = this.populateRoleMgtMenu();
    this.userMgtMenu = this.populateUserMgtMenu();
    this.siteMgtMenu = this.populateSiteMgtMenu();
    this.bookMgtMenu = this.populateBookMgtMenu();
    this.multimediaMgtMenu = this.populateMultimediaMgtMenu();

    if (this.isLoggedIn) this.menu.splice(++start, 0, this.mgtMenuGroup);
    if (this.isLoggedIn) this.menu.splice(++start, 0, this.roleMgtMenu);
    if (this.isLoggedIn) this.menu.splice(++start, 0, this.userMgtMenu);
    if (this.isLoggedIn) this.menu.splice(++start, 0, this.siteMgtMenu);
    if (this.isLoggedIn) this.menu.splice(++start, 0, this.bookMgtMenu);
    if (this.isLoggedIn) this.menu.splice(++start, 0, this.multimediaMgtMenu);

    this.personalMenuGroup = this.populatePersonalMenuGroup();
    this.authMenu = this.populateAuthMenu();
    this.profileMenu = this.populateProfileMenu();

    this.menu.splice(++start, 0, this.personalMenuGroup);
    this.menu.splice(++start, 0, this.authMenu);
    if (this.isLoggedIn) this.menu.splice(++start, 0, this.profileMenu);
    // this.menu.push(this.mgtMenuGroup);
    // this.menu.push(this.roleMgtMenu);
    // this.menu.push(this.userMgtMenu);
    // this.menu.push(this.siteMgtMenu);
    // this.menu.push(this.bookMgtMenu);

  }

  private populateMgtMenuGroup(): NbMenuItem {
    return {
      title: 'ADMINISTRATION',
      group: true,
    };
  }

  private populateRoleMgtMenu(): NbMenuItem {
    return {
      title: 'Role Management',
      icon: 'nb-flame-circled',
      link: '/bookui/admin/role-management',
      children: [
        {
          title: 'Roles',
          link: '/bookui/admin/role-management/roles',
        },
      ],
    };
  }

  private populateUserMgtMenu(): NbMenuItem {
    return {
      title: 'User Management',
      icon: 'nb-gear',
      link: '/bookui/admin/user-management',
      children: [
        {
          title: 'Users',
          link: '/bookui/admin/user-management/users',
        },
      ],
    };
  }

  private populateSiteMgtMenu(): NbMenuItem {
    return {
      title: 'Site Management',
      icon: 'nb-shuffle',
      link: '/bookui/admin/site-management',
      children: [
        {
          title: 'Sites',
          link: '/bookui/admin/site-management/sites',
        },
      ],
    };

  }

  private populateBookMgtMenu(): NbMenuItem {
    return {
      title: 'Book Management',
      icon: 'nb-star',
      link: '/bookui/admin/book-management',
      children: [
        {
          title: 'Books',
          link: '/bookui/admin/book-management/books',
        },
        {
          title: 'Chapters',
          link: '/bookui/admin/book-management/chapters',
        },
        {
          title: 'Sections',
          link: '/bookui/admin/book-management/sections',
        },
        {
          title: 'Subsections',
          link: '/bookui/admin/book-management/subsections',
        },
      ],
    };
  }

  private populateMultimediaMgtMenu(): NbMenuItem {
    return {
      title: 'Multimedia Management',
      icon: 'nb-star',
      link: '/bookui/admin/multimedia-management',
      children: [
        {
          title: 'Multimedia',
          link: '/bookui/admin/multimedia-management/multimedia',
        },
      ],
    };
  }

  private populatePersonalMenuGroup(): NbMenuItem {
    return {
      title: 'PERSONAL',
      group: true,
    };
  }

  private populateAuthMenu(): NbMenuItem {
    const authSubs = [];
    if (!this.isLoggedIn) {
      const loginSub = {title: 'Login', link: '/bookui/auth/login'};
      authSubs.push(loginSub);
    } else {
      const resetPassSub = {title: 'Reset Password', link: '/bookui/auth/reset-password'};
      const logoutSub = {title: 'Logout', link: '/bookui/auth/logout'};
      authSubs.push(resetPassSub);
      authSubs.push(logoutSub);
    }

    return {
      title: 'Authentication',
      icon: 'nb-locked',
      children: authSubs,
    };
  }

  private populateProfileMenu(): NbMenuItem {
    return {
      title: 'My Profile',
      icon: 'nb-locked',
      link: '/bookui/my-profile',
      // children: [
      //   {
      //     title: 'Roles',
      //     link: '/bookui/admin/role-management/roles',
      //   },
      // ],
    };
  }
}
