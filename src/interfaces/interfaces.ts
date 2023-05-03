export interface Product {
    OSSProcedure?: Ossprocedure
    AccessoryOrSurchargeFlag?: string
    AdditionalDescription?: string
    ArticleNumber: string
    BusinessPartnerReferenceAddressNumber?: string
    CalculatedQuantityValue: number
    CalculationPrice?: number
    Commission?: number
    CostCentreName?: string
    CustomDate?: string
    CustomNumber?: number
    CustomText1?: string
    CustomText2?: string
    DeliveryDate?: string
    DiscountPercent?: number
    DiscountPercent2?: number
    EmployeeNumber?: string
    FinancialAccountId?: string
    GoodsNumber?: string
    IsCashDiscountAllowed?: boolean
    IsCommissionArticle?: boolean
    IsDiscountAllowed?: boolean
    IsPrintLock?: boolean
    IsWarehouseArticle?: boolean
    Memo?: string
    Name?: string
    OrderNumber?: string
    PayerName?: string
    PriceQuantityUnit?: string
    PriceUnitFactor?: number
    ProjectId?: number
    QuantityUnit?: string
    TaxCode?: string
    TaxRate?: number
    TotalPrice?: number
    UnitPrice?: number
    WarehouseId?: string
    Weight?: number
    StoreInformation?: StoreInformation[]
    ExtraFields?: ExtraFields
  }
  
  export interface Ossprocedure {
    Value?: number
    Name?: string
  }
  
  export interface StoreInformation {
    ArticleNumber?: string
    ExpirationDate?: string
    Identifier?: string
    PriceQuantity?: number
    Quantity?: number
    QuantityUnit?: string
    SerialNumber?: string
    StoragePlaceIdentifier?: number
    TargetStoragePlaceIdentifier?: number
    TargetWarehouse?: string
    Warehouse?: string
  }
  
  export interface ExtraFields {
    [key: string]: string;
  }