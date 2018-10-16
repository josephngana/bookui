import {Component, OnInit} from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {MENU_ITEMS} from './fronts-menu';
import {Book} from '../pages/bookui-admin/book-management/domain/book';
import {DataTransferService} from '../shared/service/data-transfer.service';
import {ChapterService} from '../pages/bookui-admin/book-management/service/chapter.service';
import {Chapter} from '../pages/bookui-admin/book-management/domain/chapter';
import {Section} from '../pages/bookui-admin/book-management/domain/section';
import {SectionService} from '../pages/bookui-admin/book-management/service/section.service';
import {BookComponent} from './book/book.component';
import {ToasterUtils} from '../conf/util';

@Component({
  selector: 'ngx-fronts',
  templateUrl: './fronts.component.html',
})
export class FrontsComponent implements OnInit {

  loading: boolean;
  menus: NbMenuItem[];
  book: Book;
  chapters: Chapter[];
  sectionMap: Map<string, Section[]>;

  constructor(private dataTransferService: DataTransferService,
              private chapterService: ChapterService,
              private sectionService: SectionService,
  ) {
  }

  ngOnInit() {
    this.chapters = [];
    this.menus = MENU_ITEMS;
    this.dataTransferService.currentBook.subscribe(book => this.book = book);
    this.getChaptersInBook();
  }

  private getChaptersInBook(): void {
    this.loading = true;
    const bookId = this.book ? this.book.bookId : new Book().bookId;
    // let c = new Chapter();
    // c.chapterTitle = 'How To Marry';
    // this.chapters.push(c);
    // c = new Chapter();
    // c.chapterTitle = 'Link Here';
    // this.chapters.push(c);
    // c = new Chapter();
    // c.chapterTitle = 'Here';
    // this.chapters.push(c);
    // this.buildMenus(this.chapters);
    // this.loading = false;
    this.chapterService.getChapters(bookId).subscribe(chapters => {
        if (chapters) {
          this.chapters = chapters;
        }
      },
      error => {
        this.loading = false;
        BookComponent.showInformation(ToasterUtils.TOAST_TYPE.error, 'Book Read - Menus', 'An error occurred: ' + error.message);
      },
      () => {
        this.loading = false;
        this.buildMenus(this.chapters);
      });
  }

  private buildMenus(chapters: Chapter[]): void {
    chapters.forEach(chapter => {
      const title = chapter.chapterTitle;
      const link = '/bookui-read/book/chapter/' + chapter.chapterId;
      this.getSectionsInChapter(chapter);
      // const menu: NbMenuItem = {
      //   title: title,
      //   link: link,
      //   icon: 'nb-play-outline',
      // };
      //
      // this.menus.push(menu);
    });
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

  private getSectionsInChapter(chapter: Chapter) {
    this.loading = true;
    this.sectionService.getSectionsInChapter(chapter.chapterId).subscribe(sections => {
        if (sections) {
          this.sectionMap.set(chapter.chapterId, sections);
        } else {
          BookComponent.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Book Read - Menu', 'Could not get sections for ' + chapter.chapterTitle);
        }
      },
      error => {
        this.loading = false;
        BookComponent.showInformation(ToasterUtils.TOAST_TYPE.error, 'Book Read - Menu', 'An error occurred: ' + error.message);
      },
      () => {
        this.loading = false;
      });
  }
}
