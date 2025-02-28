import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { TapComponent } from './components/tap/tap.component';
import { FilterComponent } from './components/filter/filter.component';
import { ChainingOperatorsComponent } from './components/chaining-operators/chaining-operators.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'map', component: MapComponent },
  { path: 'tap', component: TapComponent },
  { path: 'filter', component: FilterComponent },
  { path: 'chaining-operators', component: ChainingOperatorsComponent },

  { path: '**', redirectTo: '' },
];
