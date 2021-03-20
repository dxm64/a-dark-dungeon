import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: 'inventory.component.html',
  styleUrls: ['inventory.component.css']
})
export class InventoryComponent implements OnInit {
  tabs = ['Stats', 'Items', 'Spells']
  activeTab = 0

  stats: any[] = [
    { id: 'strength', label: 'Strength', value: 0 },
    { id: 'intelligence', label: 'Intelligence', value: 0 },
    { id: 'agility', label: 'Agility', value: 0 },
  ]

  items: any[] = [
    { id: 'dagger', label: 'Dagger', quantity: 12 },
    { id: 'meat', label: 'Meat', quantity: 0 },
    { id: 'fur', label: 'Fur', quantity: 5 },
  ]

  spells: any[] = [
    { id: 'fireball', label: 'Fireball', cost: 12 },
    { id: 'light', label: 'Light', cost: 0 },
    { id: 'poison', label: 'Poison', cost: 5 },
  ]

  constructor() { }

  ngOnInit() { }

  changeTab(index: number) {
    this.activeTab = index;
  }
}
