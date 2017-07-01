import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule,BrowserXhr  } from '@angular/http';
import { MaterialModule , MdDialogRef, MdDialog} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { BrowserXhr } from '@angular/http';
import {NgProgressModule, NgProgressBrowserXhr, NgProgressService } from 'ngx-progressbar';

import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
// import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { ErrorPageComponent } from './errorpage';
import { LoginComponent } from './login';
import { LogoutComponent } from './logout';
import { RootComponent } from './root';
import { DashboardComponent } from './dashboard'
import { ConfirmDialog} from './shared'

// import { XLargeDirective } from './home/x-large';

// import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import { ChartsModule } from 'ng2-charts';
import { RootModule } from './root';
import { CustomerModule } from './customer';
// import { ProductModule } from './products';
// import { SharedModule } from './shared';
import { AuthGuard } from './_guard';
import { BackendService, AuthenticationService, PagerService } from './_services';
// import {  } from '../_services';
// import { BackendService, AlertService, AuthenticationService, UserService } from './_services';
// import '../assets/css/deeppurple-amber.css';
import '../assets/css/pink-bluegrey.css';
import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AboutComponent,
    // HomeComponent,
    ErrorPageComponent,
    // XLargeDirective,
    LoginComponent,
    LogoutComponent,
    RootComponent,
    DashboardComponent,
    ConfirmDialog,
    
    // StarComponent
    // AlertComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    ChartsModule,
   NgProgressModule, 
    // NgProgressBrowserXhr,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    // ProductModule,
    CustomerModule,
    RootModule,

  ],
  entryComponents:[ConfirmDialog],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    AuthGuard,
    BackendService,
    AuthenticationService,
    PagerService,
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr } ,
    ENV_PROVIDERS,
    APP_PROVIDERS,
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState,
    private progress: NgProgressService
  ) {

    // console.log('AppModule ...')
    // let http = <Http>{}
    // console.log(this.http)
    // this.http.get("http://localhost:5354/token");
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

  ngAfterContentInit(){
    
   this.progress.start();
   setTimeout(()=>{
     this.progress.done();
   }, 2000);
  }

}
