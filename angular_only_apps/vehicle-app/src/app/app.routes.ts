import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'vehicles', component: VehiclesComponent},
    {path: 'vehicles/:vehicleId', component: VehicleDetailsComponent},
    
    { path: '**', component: PageNotFoundComponent },
];
