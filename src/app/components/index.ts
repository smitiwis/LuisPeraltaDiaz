import { InputBkComponent } from './fields/input-bk/input-bk.component';
import { FormProductComponent } from './form-product/form-product.component';
import { HeaderComponent } from './header/header.component';
import { ContainerMainComponent } from './layouts/container-main/container-main.component';
import { LayoutMainComponent } from './layouts/layout-main/layout-main.component';
import { SqueletonComponent } from './squeleton/squeleton.component';

export const SHARED_COMPONENTS = [
  HeaderComponent,
  ContainerMainComponent,
  LayoutMainComponent,
  SqueletonComponent,
  InputBkComponent,
  FormProductComponent
];

export * from './header/header.component';
export * from './layouts/container-main/container-main.component';
export * from './layouts/layout-main/layout-main.component';
export * from './squeleton/squeleton.component';
export * from './fields/input-bk/input-bk.component';
export * from './squeleton/squeleton.component';

