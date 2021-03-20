import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { DungeonComponent } from './components/dungeon/dungeon.component';
import { GameComponent } from './components/game/game.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { LogComponent } from './components/log/log.component';
import { VitalComponent } from './components/vitals/vital/vital.component';
import { VitalsComponent } from './components/vitals/vitals.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ButtonComponent,
    VitalsComponent,
    VitalComponent,
    DungeonComponent,
    LogComponent,
    InventoryComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
