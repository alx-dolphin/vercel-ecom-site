import { type SchemaTypeDefinition } from 'sanity'

import { productType } from "./productType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { orderType } from './orderType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, productType, orderType],
}
