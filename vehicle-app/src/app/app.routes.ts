import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VehicleCardComponent } from './components/vehicle-card/vehicle-card.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'vehicles', component: VehiclesComponent},
    {path: 'vehicles/:vehicleId', component: VehicleDetailsComponent}
];
