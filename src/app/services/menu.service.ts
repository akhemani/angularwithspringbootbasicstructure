import { Injectable } from "@angular/core";
import { Menu } from '../models/menu.model';

@Injectable()
export class MenuService {

    menuItems: Array<Number>;

    setMenuItemList(menuItemList) {
        this.menuItems = menuItemList;
    }

    getMenuItemList() : Array<Number> {
        return this.menuItems;
    }

}
