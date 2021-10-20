import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatCardModule, MatExpansionModule, MatGridListModule, MatInputModule, MatListModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from '@angular/material';
import { httpInterceptorProviders } from './common/interceptors';
import { LoaderComponent } from './common/components/loader/loader.component';
import { TitlesManagementComponent } from './movies/containers/title-management/titles-management.component';
import { TitleDetailsComponent } from './movies/containers/title-details/title-details.component';
import { TitleAwardsComponent } from './movies/components/title-awards/title-awards.component';
import { TitleNamesComponent } from './movies/components/title-names/title-names.component';
import { TitleSearchComponent } from './movies/containers/title-search/title-search.component';
import { TitleTopCastComponent } from './movies/components/title-top-cast/title-top-cast.component';
import { TitleSearchInputComponent } from './movies/components/title-search-input/title-search-input.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoaderComponent,
    HomeComponent,
    TitlesManagementComponent,
    TitleDetailsComponent,
    TitleAwardsComponent,
    TitleNamesComponent,
    TitleSearchComponent,
    TitleTopCastComponent,
    TitleSearchInputComponent,
    TitleSearchComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: TitleSearchComponent, pathMatch: 'full' },
      { path: 'search', component: TitleSearchComponent },
      { path: 'movies', component: TitlesManagementComponent },
      { path: 'movie/:id', component: TitleDetailsComponent }
    ]),
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
