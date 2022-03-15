import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './content/pages/about-us/about-us.component';
import { EditComponent } from './content/pages/about-us/edit/edit.component';
import { EditHomeComponent } from './content/pages/home/edit-home/edit-home.component';
import { HomeComponent } from './content/pages/home/home.component';
import { HomeDashboardComponent } from './content/pages/home-dashboard/home-dashboard.component';
import { ServicesComponent } from './content/pages/services/services.component';
import { EditServiceComponent } from './content/pages/services/edit-service/edit-service.component';
import { ClientsComponent } from './content/pages/clients/clients.component';
import { EditClientComponent } from './content/pages/clients/edit-client/edit-client.component';
import { FeedbacksComponent } from './content/pages/feedbacks/feedbacks.component';
import { EditFeedbackComponent } from './content/pages/feedbacks/edit-feedback/edit-feedback.component';
import { CasestudyComponent } from './content/pages/casestudy/casestudy.component';
import { EditCasestudyComponent } from './content/pages/casestudy/edit-casestudy/edit-casestudy.component';
import { SlidersComponent } from './content/pages/sliders/sliders.component';
import { EditSlidersComponent } from './content/pages/sliders/edit-sliders/edit-sliders.component';
import { BannerImagesComponent } from './content/pages/banner-images/banner-images.component';
import { EditBannersComponent } from './content/pages/banner-images/edit-banners/edit-banners.component';
import { CaseStudyModelsComponent } from './content/pages/case-study-models/case-study-models.component';
import { EditCaseStudyModelComponent } from './content/pages/case-study-models/edit-case-study-model/edit-case-study-model.component';
import { CaseStudyModelGalleryComponent } from './content/pages/case-study-model-gallery/case-study-model-gallery.component';
import { EditCaseStudyModalGalleryComponent } from './content/pages/case-study-model-gallery/edit-case-study-modal-gallery/edit-case-study-modal-gallery.component';
import { AuthComponent } from './content/auth/auth.component';
import { NotfoundComponent } from './content/shared/notfound/notfound.component';
import { AuthGuard } from './services/auth.guard';
import { TeamsComponent } from './content/pages/teams/teams.component';
import { EditTeamComponent } from './content/pages/teams/edit-team/edit-team.component';

const routes: Routes = [

  {path: '', redirectTo:'home' ,pathMatch:'full'},
  {path: 'home', canActivate:[AuthGuard] , component:HomeDashboardComponent},
  {path: 'home-page', canActivate:[AuthGuard] , component:HomeComponent},
  {path: 'home-page/edit/:id', canActivate:[AuthGuard] , component:EditHomeComponent},
  {path: 'about-us', canActivate:[AuthGuard] , component:AboutUsComponent},
  {path: 'about-us/edit/:id', canActivate:[AuthGuard] , component:EditComponent},
  {path: 'services', canActivate:[AuthGuard] , component:ServicesComponent},
  {path: 'services/:id', canActivate:[AuthGuard] , component:EditServiceComponent},
  {path: 'clients', canActivate:[AuthGuard] , component:ClientsComponent},
  {path: 'clients/:id', canActivate:[AuthGuard] , component:EditClientComponent},
  {path: 'feedbacks', canActivate:[AuthGuard] , component:FeedbacksComponent},
  {path: 'feedbacks/:id', canActivate:[AuthGuard] , component:EditFeedbackComponent},
  {path: 'case-studies', canActivate:[AuthGuard] , component:CasestudyComponent},
  {path: 'case-studies/:id', canActivate:[AuthGuard] , component:EditCasestudyComponent},
  {path: 'case-study-model/:id', canActivate:[AuthGuard] , component:CaseStudyModelsComponent},
  {path: 'case-study-model/edit/:id', canActivate:[AuthGuard] , component:EditCaseStudyModelComponent},
  {path: 'case-study-model-gallery/:id', canActivate:[AuthGuard] , component:CaseStudyModelGalleryComponent},
  {path: 'case-study-model-gallery/edit/:id', canActivate:[AuthGuard] , component:EditCaseStudyModalGalleryComponent},
  {path: 'sliders', canActivate:[AuthGuard] , component:SlidersComponent},
  {path: 'sliders/:id', canActivate:[AuthGuard] , component:EditSlidersComponent},
  {path: 'teams', canActivate:[AuthGuard] , component:TeamsComponent},
  {path: 'teams/:id', canActivate:[AuthGuard] , component:EditTeamComponent},
  {path: 'banners', canActivate:[AuthGuard] , component:BannerImagesComponent},
  {path: 'banners/edit/:id', canActivate:[AuthGuard] , component:EditBannersComponent},
  {path: 'auth', component:AuthComponent},
  {path: '**', component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
