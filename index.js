// // Dropshipping Configuration
// let totalDropshipOrders = 100;

// // Item Variants
// let totalItemVariants = 3;

// // Quantity per category
// let apparelQuantity = 10;
// let nonApparelQuantity = 5;
// let printQuantity = 1;

// // Packaging Cost
// let boxCost = {small: 2.95, medium: 3.95, large: 4.95 } // Small: 2.95, Medium: 3.95, Large: 4.95

// // Item Charges
// let baseItemCost = 0.65;
// let printItemCost = 0.55;
// let variantCharge = 1;
// let printVariantCharge = 1;

// // Additional Service Fees
// let sortingFee = 0.55;
// let foldingFee = 0.55;
// let additionalServiceFee = sortingFee + foldingFee;

// // Fixed Operational Costs
// let receivingFee = 75;
// let adminFee = 125;

// // Per Order Cost Calculation
// let apparelCostPerOrder =
//   apparelQuantity * (baseItemCost + additionalServiceFee) + variantCharge;
// let nonApparelCostPerOrder = nonApparelQuantity * baseItemCost + variantCharge;
// let printCostPerOrder = printQuantity * printItemCost + printVariantCharge;

// // Total Dropshipping Cost Calculation
// let totalDropshipCost =
//   (apparelCostPerOrder + nonApparelCostPerOrder + printCostPerOrder + boxCost["medium"]) ) *
//     totalDropshipOrders +
//   receivingFee +
//   adminFee;

// // Console Output
// console.log("Apparel Cost per Order:", apparelCostPerOrder);
// console.log("Non-Apparel Cost per Order:", nonApparelCostPerOrder);
// console.log("Print Cost per Order:", printCostPerOrder);
// console.log("Total Dropshipping Cost:", totalDropshipCost);

// Bulk Shipping Configuration
let totalLocations = 5;

// Item Variants
let totalItemVariants = 3;

// Quantity per category
let apparelQuantity = 50;
let nonApparelQuantity = 25;
let printQuantity = 100;

// Packaging Cost
let boxCost = { medium: 6.95, large: 8.95 }; // Medium: 6.95, Large: 8.95

// Item Charges
let baseItemCost = 0.25;
let printItemCost = 0.25;
let variantCharge = 1;
let printVariantCharge = 0.55;

// Additional Service Fees
let sortingFee = 0.25;
let foldingFee = 0.25;
let additionalServiceFee = sortingFee + foldingFee;

// Fixed Operational Costs
let receivingFee = 75;
let adminFee = 125;

// Per Order Cost Calculation
let apparelCostPerLocation =
  apparelQuantity * (baseItemCost + additionalServiceFee) + variantCharge;
let nonApparelCostPerLocation =
  nonApparelQuantity * baseItemCost + variantCharge;
let printCostPerLocation = printQuantity * printItemCost + printVariantCharge;

// Total Bulk Shipping Cost Calculation
let totalBulkShippingCost =
  (apparelCostPerLocation +
    nonApparelCostPerLocation +
    printCostPerLocation +
    boxCost["large"]) *
    totalLocations +
  receivingFee +
  adminFee;

// Console Output
console.log("Apparel Cost per Location:", apparelCostPerLocation);
console.log("Non-Apparel Cost per Location:", nonApparelCostPerLocation);
console.log("Print Cost per Location:", printCostPerLocation);
console.log("Total Bulk Shipping Cost:", totalBulkShippingCost);