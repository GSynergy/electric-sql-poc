import { z } from 'zod';
import type { Prisma } from './prismaClient';
import { type TableSchema, DbSchema, ElectricClient, type HKT } from 'electric-sql/client/model';
import migrations from './migrations';
import pgMigrations from './pg-migrations';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const CustomersScalarFieldEnumSchema = z.enum(['customerid','firstname','lastname','email']);

export const ItemsScalarFieldEnumSchema = z.enum(['value']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CUSTOMERS SCHEMA
/////////////////////////////////////////

export const CustomersSchema = z.object({
  customerid: z.string(),
  firstname: z.string().nullable(),
  lastname: z.string().nullable(),
  email: z.string().nullable(),
})

export type Customers = z.infer<typeof CustomersSchema>

/////////////////////////////////////////
// ITEMS SCHEMA
/////////////////////////////////////////

export const ItemsSchema = z.object({
  value: z.string(),
})

export type Items = z.infer<typeof ItemsSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CUSTOMERS
//------------------------------------------------------

export const CustomersSelectSchema: z.ZodType<Prisma.CustomersSelect> = z.object({
  customerid: z.boolean().optional(),
  firstname: z.boolean().optional(),
  lastname: z.boolean().optional(),
  email: z.boolean().optional(),
}).strict()

// ITEMS
//------------------------------------------------------

export const ItemsSelectSchema: z.ZodType<Prisma.ItemsSelect> = z.object({
  value: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CustomersWhereInputSchema: z.ZodType<Prisma.CustomersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CustomersWhereInputSchema),z.lazy(() => CustomersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CustomersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CustomersWhereInputSchema),z.lazy(() => CustomersWhereInputSchema).array() ]).optional(),
  customerid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstname: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastname: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CustomersOrderByWithRelationInputSchema: z.ZodType<Prisma.CustomersOrderByWithRelationInput> = z.object({
  customerid: z.lazy(() => SortOrderSchema).optional(),
  firstname: z.lazy(() => SortOrderSchema).optional(),
  lastname: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CustomersWhereUniqueInputSchema: z.ZodType<Prisma.CustomersWhereUniqueInput> = z.object({
  customerid: z.string().optional()
}).strict();

export const CustomersOrderByWithAggregationInputSchema: z.ZodType<Prisma.CustomersOrderByWithAggregationInput> = z.object({
  customerid: z.lazy(() => SortOrderSchema).optional(),
  firstname: z.lazy(() => SortOrderSchema).optional(),
  lastname: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CustomersCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CustomersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CustomersMinOrderByAggregateInputSchema).optional()
}).strict();

export const CustomersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CustomersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CustomersScalarWhereWithAggregatesInputSchema),z.lazy(() => CustomersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CustomersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CustomersScalarWhereWithAggregatesInputSchema),z.lazy(() => CustomersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  customerid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstname: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  lastname: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ItemsWhereInputSchema: z.ZodType<Prisma.ItemsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ItemsWhereInputSchema),z.lazy(() => ItemsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemsWhereInputSchema),z.lazy(() => ItemsWhereInputSchema).array() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ItemsOrderByWithRelationInputSchema: z.ZodType<Prisma.ItemsOrderByWithRelationInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemsWhereUniqueInputSchema: z.ZodType<Prisma.ItemsWhereUniqueInput> = z.object({
  value: z.string().optional()
}).strict();

export const ItemsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ItemsOrderByWithAggregationInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ItemsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ItemsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ItemsMinOrderByAggregateInputSchema).optional()
}).strict();

export const ItemsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ItemsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ItemsScalarWhereWithAggregatesInputSchema),z.lazy(() => ItemsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemsScalarWhereWithAggregatesInputSchema),z.lazy(() => ItemsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CustomersCreateInputSchema: z.ZodType<Prisma.CustomersCreateInput> = z.object({
  customerid: z.string(),
  firstname: z.string().optional().nullable(),
  lastname: z.string().optional().nullable(),
  email: z.string().optional().nullable()
}).strict();

export const CustomersUncheckedCreateInputSchema: z.ZodType<Prisma.CustomersUncheckedCreateInput> = z.object({
  customerid: z.string(),
  firstname: z.string().optional().nullable(),
  lastname: z.string().optional().nullable(),
  email: z.string().optional().nullable()
}).strict();

export const CustomersUpdateInputSchema: z.ZodType<Prisma.CustomersUpdateInput> = z.object({
  customerid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CustomersUncheckedUpdateInputSchema: z.ZodType<Prisma.CustomersUncheckedUpdateInput> = z.object({
  customerid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CustomersCreateManyInputSchema: z.ZodType<Prisma.CustomersCreateManyInput> = z.object({
  customerid: z.string(),
  firstname: z.string().optional().nullable(),
  lastname: z.string().optional().nullable(),
  email: z.string().optional().nullable()
}).strict();

export const CustomersUpdateManyMutationInputSchema: z.ZodType<Prisma.CustomersUpdateManyMutationInput> = z.object({
  customerid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CustomersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CustomersUncheckedUpdateManyInput> = z.object({
  customerid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ItemsCreateInputSchema: z.ZodType<Prisma.ItemsCreateInput> = z.object({
  value: z.string()
}).strict();

export const ItemsUncheckedCreateInputSchema: z.ZodType<Prisma.ItemsUncheckedCreateInput> = z.object({
  value: z.string()
}).strict();

export const ItemsUpdateInputSchema: z.ZodType<Prisma.ItemsUpdateInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsUncheckedUpdateInputSchema: z.ZodType<Prisma.ItemsUncheckedUpdateInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsCreateManyInputSchema: z.ZodType<Prisma.ItemsCreateManyInput> = z.object({
  value: z.string()
}).strict();

export const ItemsUpdateManyMutationInputSchema: z.ZodType<Prisma.ItemsUpdateManyMutationInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ItemsUncheckedUpdateManyInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const CustomersCountOrderByAggregateInputSchema: z.ZodType<Prisma.CustomersCountOrderByAggregateInput> = z.object({
  customerid: z.lazy(() => SortOrderSchema).optional(),
  firstname: z.lazy(() => SortOrderSchema).optional(),
  lastname: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CustomersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CustomersMaxOrderByAggregateInput> = z.object({
  customerid: z.lazy(() => SortOrderSchema).optional(),
  firstname: z.lazy(() => SortOrderSchema).optional(),
  lastname: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CustomersMinOrderByAggregateInputSchema: z.ZodType<Prisma.CustomersMinOrderByAggregateInput> = z.object({
  customerid: z.lazy(() => SortOrderSchema).optional(),
  firstname: z.lazy(() => SortOrderSchema).optional(),
  lastname: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const ItemsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsCountOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsMaxOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsMinOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CustomersFindFirstArgsSchema: z.ZodType<Prisma.CustomersFindFirstArgs> = z.object({
  select: CustomersSelectSchema.optional(),
  where: CustomersWhereInputSchema.optional(),
  orderBy: z.union([ CustomersOrderByWithRelationInputSchema.array(),CustomersOrderByWithRelationInputSchema ]).optional(),
  cursor: CustomersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CustomersScalarFieldEnumSchema.array().optional(),
}).strict() 

export const CustomersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CustomersFindFirstOrThrowArgs> = z.object({
  select: CustomersSelectSchema.optional(),
  where: CustomersWhereInputSchema.optional(),
  orderBy: z.union([ CustomersOrderByWithRelationInputSchema.array(),CustomersOrderByWithRelationInputSchema ]).optional(),
  cursor: CustomersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CustomersScalarFieldEnumSchema.array().optional(),
}).strict() 

export const CustomersFindManyArgsSchema: z.ZodType<Prisma.CustomersFindManyArgs> = z.object({
  select: CustomersSelectSchema.optional(),
  where: CustomersWhereInputSchema.optional(),
  orderBy: z.union([ CustomersOrderByWithRelationInputSchema.array(),CustomersOrderByWithRelationInputSchema ]).optional(),
  cursor: CustomersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CustomersScalarFieldEnumSchema.array().optional(),
}).strict() 

export const CustomersAggregateArgsSchema: z.ZodType<Prisma.CustomersAggregateArgs> = z.object({
  where: CustomersWhereInputSchema.optional(),
  orderBy: z.union([ CustomersOrderByWithRelationInputSchema.array(),CustomersOrderByWithRelationInputSchema ]).optional(),
  cursor: CustomersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const CustomersGroupByArgsSchema: z.ZodType<Prisma.CustomersGroupByArgs> = z.object({
  where: CustomersWhereInputSchema.optional(),
  orderBy: z.union([ CustomersOrderByWithAggregationInputSchema.array(),CustomersOrderByWithAggregationInputSchema ]).optional(),
  by: CustomersScalarFieldEnumSchema.array(),
  having: CustomersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const CustomersFindUniqueArgsSchema: z.ZodType<Prisma.CustomersFindUniqueArgs> = z.object({
  select: CustomersSelectSchema.optional(),
  where: CustomersWhereUniqueInputSchema,
}).strict() 

export const CustomersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CustomersFindUniqueOrThrowArgs> = z.object({
  select: CustomersSelectSchema.optional(),
  where: CustomersWhereUniqueInputSchema,
}).strict() 

export const ItemsFindFirstArgsSchema: z.ZodType<Prisma.ItemsFindFirstArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  where: ItemsWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOrderByWithRelationInputSchema.array(),ItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ItemsScalarFieldEnumSchema.array().optional(),
}).strict() 

export const ItemsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ItemsFindFirstOrThrowArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  where: ItemsWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOrderByWithRelationInputSchema.array(),ItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ItemsScalarFieldEnumSchema.array().optional(),
}).strict() 

export const ItemsFindManyArgsSchema: z.ZodType<Prisma.ItemsFindManyArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  where: ItemsWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOrderByWithRelationInputSchema.array(),ItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ItemsScalarFieldEnumSchema.array().optional(),
}).strict() 

export const ItemsAggregateArgsSchema: z.ZodType<Prisma.ItemsAggregateArgs> = z.object({
  where: ItemsWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOrderByWithRelationInputSchema.array(),ItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const ItemsGroupByArgsSchema: z.ZodType<Prisma.ItemsGroupByArgs> = z.object({
  where: ItemsWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOrderByWithAggregationInputSchema.array(),ItemsOrderByWithAggregationInputSchema ]).optional(),
  by: ItemsScalarFieldEnumSchema.array(),
  having: ItemsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const ItemsFindUniqueArgsSchema: z.ZodType<Prisma.ItemsFindUniqueArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  where: ItemsWhereUniqueInputSchema,
}).strict() 

export const ItemsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ItemsFindUniqueOrThrowArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  where: ItemsWhereUniqueInputSchema,
}).strict() 

export const CustomersCreateArgsSchema: z.ZodType<Prisma.CustomersCreateArgs> = z.object({
  select: CustomersSelectSchema.optional(),
  data: z.union([ CustomersCreateInputSchema,CustomersUncheckedCreateInputSchema ]),
}).strict() 

export const CustomersUpsertArgsSchema: z.ZodType<Prisma.CustomersUpsertArgs> = z.object({
  select: CustomersSelectSchema.optional(),
  where: CustomersWhereUniqueInputSchema,
  create: z.union([ CustomersCreateInputSchema,CustomersUncheckedCreateInputSchema ]),
  update: z.union([ CustomersUpdateInputSchema,CustomersUncheckedUpdateInputSchema ]),
}).strict() 

export const CustomersCreateManyArgsSchema: z.ZodType<Prisma.CustomersCreateManyArgs> = z.object({
  data: CustomersCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() 

export const CustomersDeleteArgsSchema: z.ZodType<Prisma.CustomersDeleteArgs> = z.object({
  select: CustomersSelectSchema.optional(),
  where: CustomersWhereUniqueInputSchema,
}).strict() 

export const CustomersUpdateArgsSchema: z.ZodType<Prisma.CustomersUpdateArgs> = z.object({
  select: CustomersSelectSchema.optional(),
  data: z.union([ CustomersUpdateInputSchema,CustomersUncheckedUpdateInputSchema ]),
  where: CustomersWhereUniqueInputSchema,
}).strict() 

export const CustomersUpdateManyArgsSchema: z.ZodType<Prisma.CustomersUpdateManyArgs> = z.object({
  data: z.union([ CustomersUpdateManyMutationInputSchema,CustomersUncheckedUpdateManyInputSchema ]),
  where: CustomersWhereInputSchema.optional(),
}).strict() 

export const CustomersDeleteManyArgsSchema: z.ZodType<Prisma.CustomersDeleteManyArgs> = z.object({
  where: CustomersWhereInputSchema.optional(),
}).strict() 

export const ItemsCreateArgsSchema: z.ZodType<Prisma.ItemsCreateArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  data: z.union([ ItemsCreateInputSchema,ItemsUncheckedCreateInputSchema ]),
}).strict() 

export const ItemsUpsertArgsSchema: z.ZodType<Prisma.ItemsUpsertArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  where: ItemsWhereUniqueInputSchema,
  create: z.union([ ItemsCreateInputSchema,ItemsUncheckedCreateInputSchema ]),
  update: z.union([ ItemsUpdateInputSchema,ItemsUncheckedUpdateInputSchema ]),
}).strict() 

export const ItemsCreateManyArgsSchema: z.ZodType<Prisma.ItemsCreateManyArgs> = z.object({
  data: ItemsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() 

export const ItemsDeleteArgsSchema: z.ZodType<Prisma.ItemsDeleteArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  where: ItemsWhereUniqueInputSchema,
}).strict() 

export const ItemsUpdateArgsSchema: z.ZodType<Prisma.ItemsUpdateArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  data: z.union([ ItemsUpdateInputSchema,ItemsUncheckedUpdateInputSchema ]),
  where: ItemsWhereUniqueInputSchema,
}).strict() 

export const ItemsUpdateManyArgsSchema: z.ZodType<Prisma.ItemsUpdateManyArgs> = z.object({
  data: z.union([ ItemsUpdateManyMutationInputSchema,ItemsUncheckedUpdateManyInputSchema ]),
  where: ItemsWhereInputSchema.optional(),
}).strict() 

export const ItemsDeleteManyArgsSchema: z.ZodType<Prisma.ItemsDeleteManyArgs> = z.object({
  where: ItemsWhereInputSchema.optional(),
}).strict() 

interface CustomersGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.CustomersArgs
  readonly type: Omit<Prisma.CustomersGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface ItemsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ItemsArgs
  readonly type: Omit<Prisma.ItemsGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

export const tableSchemas = {
  customers: {
    fields: new Map([
      [
        "customerid",
        "TEXT"
      ],
      [
        "firstname",
        "TEXT"
      ],
      [
        "lastname",
        "TEXT"
      ],
      [
        "email",
        "TEXT"
      ]
    ]),
    relations: [
    ],
    modelSchema: (CustomersCreateInputSchema as any)
      .partial()
      .or((CustomersUncheckedCreateInputSchema as any).partial()),
    createSchema: CustomersCreateArgsSchema,
    createManySchema: CustomersCreateManyArgsSchema,
    findUniqueSchema: CustomersFindUniqueArgsSchema,
    findSchema: CustomersFindFirstArgsSchema,
    updateSchema: CustomersUpdateArgsSchema,
    updateManySchema: CustomersUpdateManyArgsSchema,
    upsertSchema: CustomersUpsertArgsSchema,
    deleteSchema: CustomersDeleteArgsSchema,
    deleteManySchema: CustomersDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof CustomersUncheckedCreateInputSchema>,
    Prisma.CustomersCreateArgs['data'],
    Prisma.CustomersUpdateArgs['data'],
    Prisma.CustomersFindFirstArgs['select'],
    Prisma.CustomersFindFirstArgs['where'],
    Prisma.CustomersFindUniqueArgs['where'],
    never,
    Prisma.CustomersFindFirstArgs['orderBy'],
    Prisma.CustomersScalarFieldEnum,
    CustomersGetPayload
  >,
  items: {
    fields: new Map([
      [
        "value",
        "TEXT"
      ]
    ]),
    relations: [
    ],
    modelSchema: (ItemsCreateInputSchema as any)
      .partial()
      .or((ItemsUncheckedCreateInputSchema as any).partial()),
    createSchema: ItemsCreateArgsSchema,
    createManySchema: ItemsCreateManyArgsSchema,
    findUniqueSchema: ItemsFindUniqueArgsSchema,
    findSchema: ItemsFindFirstArgsSchema,
    updateSchema: ItemsUpdateArgsSchema,
    updateManySchema: ItemsUpdateManyArgsSchema,
    upsertSchema: ItemsUpsertArgsSchema,
    deleteSchema: ItemsDeleteArgsSchema,
    deleteManySchema: ItemsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof ItemsUncheckedCreateInputSchema>,
    Prisma.ItemsCreateArgs['data'],
    Prisma.ItemsUpdateArgs['data'],
    Prisma.ItemsFindFirstArgs['select'],
    Prisma.ItemsFindFirstArgs['where'],
    Prisma.ItemsFindUniqueArgs['where'],
    never,
    Prisma.ItemsFindFirstArgs['orderBy'],
    Prisma.ItemsScalarFieldEnum,
    ItemsGetPayload
  >,
}

export const schema = new DbSchema(tableSchemas, migrations, pgMigrations)
export type Electric = ElectricClient<typeof schema>
