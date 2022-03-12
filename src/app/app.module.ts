import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './content/pages/about-us/about-us.component';
import { SidebarComponent } from './content/shared/sidebar/sidebar.component';
import { NavbarComponent } from './content/shared/navbar/navbar.component';
import { FooterComponent } from './content/shared/footer/footer.component';
import { EditComponent } from './content/pages/about-us/edit/edit.component';
import { HomeComponent } from './content/pages/home/home.component';
import { EditHomeComponent } from './content/pages/home/edit-home/edit-home.component';
import { ServicesComponent } from './content/pages/services/services.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditServiceComponent } from './content/pages/services/edit-service/edit-service.component';
import { ClientsComponent } from './content/pages/clients/clients.component';
import { EditClientComponent } from './content/pages/clients/edit-client/edit-client.component';
import { FeedbacksComponent } from './content/pages/feedbacks/feedbacks.component';
import { EditFeedbackComponent } from './content/pages/feedbacks/edit-feedback/edit-feedback.component';
import { BannerImagesComponent } from './content/pages/banner-images/banner-images.component';
import { CasestudyComponent } from './content/pages/casestudy/casestudy.component';
import { EditCasestudyComponent } from './content/pages/casestudy/edit-casestudy/edit-casestudy.component';
import { SlidersComponent } from './content/pages/sliders/sliders.component';
import { EditSlidersComponent } from './content/pages/sliders/edit-sliders/edit-sliders.component';
import { EditBannersComponent } from './content/pages/banner-images/edit-banners/edit-banners.component';
import { HomeDashboardComponent } from './content/pages/home-dashboard/home-dashboard.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { CaseStudyModelsComponent } from './content/pages/case-study-models/case-study-models.component';
import { EditCaseStudyModelComponent } from './content/pages/case-study-models/edit-case-study-model/edit-case-study-model.component';
import { CaseStudyModelGalleryComponent } from './content/pages/case-study-model-gallery/case-study-model-gallery.component';
import { EditCaseStudyModalGalleryComponent } from './content/pages/case-study-model-gallery/edit-case-study-modal-gallery/edit-case-study-modal-gallery.component';
import { LoaderActionComponent } from './content/shared/loader-action/loader-action.component';
import { LoadingComponent } from './content/shared/loading/loading.component';
import { AuthComponent } from './content/pages/auth/auth.component';
import { NotfoundComponent } from './content/shared/notfound/notfound.component';
import { TeamsComponent } from './content/pages/teams/teams.component';
import { EditTeamsComponent } from './content/pages/teams/edit-teams/edit-teams.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    EditComponent,
    HomeComponent,
    EditHomeComponent,
    ServicesComponent,
    EditServiceComponent,
    ClientsComponent,
    EditClientComponent,
    FeedbacksComponent,
    EditFeedbackComponent,
    BannerImagesComponent,
    CasestudyComponent,
    EditCasestudyComponent,
    SlidersComponent,
    EditSlidersComponent,
    EditBannersComponent,
    HomeDashboardComponent,
    CaseStudyModelsComponent,
    EditCaseStudyModelComponent,
    CaseStudyModelGalleryComponent,
    EditCaseStudyModalGalleryComponent,
    LoaderActionComponent,
    LoadingComponent,
    AuthComponent,
    NotfoundComponent,
    TeamsComponent,
    EditTeamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
