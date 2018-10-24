import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { ChannelComponent } from './channel/channel.component';
import { Page404Component } from './core/page404/page404.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'channel', component: ChannelListComponent, canActivate: [AuthGuardService] },
  { path: 'channel/:id', component: ChannelComponent, canActivate: [AuthGuardService] },
  { path: 'not-found', component: Page404Component },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
