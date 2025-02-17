class CostCalculator {
  constructor() {
  
    document.querySelector("form").addEventListener("submit", this.SubmitData.bind(this));

    this.bulkShippingConfig = {
      totalLocations: 5,

      itemVariants: {
        total: 3,
      },

      quantityPerCategory: {
        apparel: 50,
        nonApparel: 25,
        print: 100,
      },

      packagingCost: {
        medium: 6.95,
        large: 8.95,
      },

      itemCharges: {
        baseItemCost: 0.25,
        printItemCost: 0.25,
        variantCharge: 1,
        printVariantCharge: 0.55,
      },

      additionalServiceFees: {
        sortingFee: 0.25,
        foldingFee: 0.25,
        total: 0.25 + 0.25,
      },

      fixedOperationalCosts: {
        receivingFee: 75,
        adminFee: 125,
      },

      calculateTotalBulkShippingCost: function ({
        totalLocations = this.totalLocations,
        apparelQuantity = this.quantityPerCategory.apparel,
        nonApparelQuantity = this.quantityPerCategory.nonApparel,
        printQuantity = this.quantityPerCategory.print,
        boxSize = "large", // Default box size
        additionalFeeType = "total",
      } = {}) {
        let apparelCostPerLocation =
          apparelQuantity *
            (this.itemCharges.baseItemCost +
              this.additionalServiceFees[additionalFeeType]) +
          this.itemCharges.variantCharge;

        let nonApparelCostPerLocation =
          nonApparelQuantity * this.itemCharges.baseItemCost +
          this.itemCharges.variantCharge;

        let printCostPerLocation =
          printQuantity * this.itemCharges.printItemCost +
          this.itemCharges.printVariantCharge;

        return (
          (apparelCostPerLocation +
            nonApparelCostPerLocation +
            printCostPerLocation +
            this.packagingCost[boxSize]) *
            totalLocations +
          this.fixedOperationalCosts.receivingFee +
          this.fixedOperationalCosts.adminFee
        );
      },
    };

    this.dropshippingConfig = {
      totalDropshipOrders: 100,

      itemVariants: {
        total: 3,
      },

      quantityPerCategory: {
        apparel: 10,
        nonApparel: 5,
        print: 1,
      },

      packagingCost: {
        small: 2.95,
        medium: 3.95,
        large: 4.95,
      },

      itemCharges: {
        baseItemCost: 0.65,
        printItemCost: 0.55,
        variantCharge: 1,
        printVariantCharge: 1,
      },

      additionalServiceFees: {
        sortingFee: 0.55,
        foldingFee: 0.55,
        total: 0.55 + 0.55,
      },

      fixedOperationalCosts: {
        receivingFee: 75,
        adminFee: 125,
      },

      calculateTotalDropshipCost: function ({
        totalDropshipOrders = this.totalDropshipOrders,
        apparelQuantity = this.quantityPerCategory.apparel,
        nonApparelQuantity = this.quantityPerCategory.nonApparel,
        printQuantity = this.quantityPerCategory.print,
        boxSize = "medium", // Default box size
        additionalFeeType = "total",
      } = {}) {
        let apparelCostPerOrder =
          apparelQuantity *
            (this.itemCharges.baseItemCost +
              this.additionalServiceFees[additionalFeeType]) +
          this.itemCharges.variantCharge;

        let nonApparelCostPerOrder =
          nonApparelQuantity * this.itemCharges.baseItemCost +
          this.itemCharges.variantCharge;

        let printCostPerOrder =
          printQuantity * this.itemCharges.printItemCost +
          this.itemCharges.printVariantCharge;

        return (
          (apparelCostPerOrder +
            nonApparelCostPerOrder +
            printCostPerOrder +
            this.packagingCost[boxSize]) *
            totalDropshipOrders +
          this.fixedOperationalCosts.receivingFee +
          this.fixedOperationalCosts.adminFee
        );
      },
    };

    this.totalCosting = 0;
    this.breakdownData = [];

    this.initialize();
  }

  initialize() {
    this.getElements();
    this.addEventListeners();
    this.checkInitialState();
  }

  getElements() {
    this.calculateBtn = document.getElementById("calculateBtn");
    this.numOfDropshipInput = document.getElementById("numOfdropship");
    this.destinations = document.getElementById("destinations");
    this.itemVarientInput = document.getElementById("itemVarient");
    this.apparelQInput = document.getElementById("apparelQ");
    this.nonApparelQInput = document.getElementById("nonapparelQ");
    this.printQInput = document.getElementById("printQ");
    this.sortingCheckbox = document.getElementById("sorting");
    this.foldingCheckbox = document.getElementById("folding");

    this.ls10 = document.getElementById("ls10");
    this.gt10 = document.getElementById("gt10");
    this.gt20 = document.getElementById("gt20");

    this.dropshipRadio = document.getElementById("dropship");
    this.bulkshipRadio = document.getElementById("bulkship");

    this.step1 = document.getElementById("step1");
    this.step2 = document.getElementById("step2");
    this.step3 = document.getElementById("step3");
    this.step4 = document.getElementById("step4");
    this.listContainer = this.step2.querySelector(".estimate-breakdown .list");
    this.submitBtn = document.getElementById("SubmitBtn");
    this.meawCard = document.querySelector(".card-wrap.meaw");
  }

  addEventListeners() {
    this.dropshipRadio.addEventListener("change", () =>
      this.removeDestinationsInput()
    );
    this.bulkshipRadio.addEventListener("change", () =>
      this.addDestinationsInput()
    );
    this.calculateBtn.addEventListener("click", () => this.calculateCost());
    document
      .getElementById("getAQuoteNowBtn")
      .addEventListener("click", () => this.showStep(3));

    document.addEventListener("DOMContentLoaded", () =>
      this.toggleActiveCard()
    );
  }

  checkInitialState() {
    if (this.bulkshipRadio.checked) {
      this.addDestinationsInput();
    } else {
      this.removeDestinationsInput();
    }
  }

  addDestinationsInput() {
    this.toggleActiveCard();
    const destinationsContainer = document.getElementById(
      "destinations-container"
    );
    const numberOfDropships = document.getElementById(
      "number-of-dropships-container"
    );
    if (destinationsContainer) {
      destinationsContainer.classList.add("active");
      numberOfDropships.style.display = "none";
    }
  }

  removeDestinationsInput() {
    this.toggleActiveCard();
    const destinationsContainer = document.getElementById(
      "destinations-container"
    );
    const numberOfDropships = document.getElementById(
      "number-of-dropships-container"
    );
    if (destinationsContainer) {
      destinationsContainer.classList.remove("active");
      numberOfDropships.style.display = "block";
    }
  }

  getBoxSize = (isBulkShip) => {
    let boxLabel;
    let boxSize;
  
    if (isBulkShip) {
      boxLabel = this.gt10.checked ? "< 10x10x10" : "< 20x20x20";
      boxSize = this.gt10.checked ? "small" : "medium";
    } else {
      if (this.ls10.checked) {
        boxLabel = "> 10x10x10";
        boxSize = "large";
      } else if (this.gt10.checked) {
        boxLabel = "< 10x10x10";
        boxSize = "small";
      } else {
        boxLabel = "< 20x20x20";
        boxSize = "medium";
      }
    }
  
    return { boxLabel, boxSize };
  };

  calculateCost() {
    const noOfDropship = parseInt(this.numOfDropshipInput.value) || 0;
    const destinations = parseInt(this.destinations.value) || 0;
    const itemVarient = parseInt(this.itemVarientInput.value) || 0;
    const apparelQ = parseInt(this.apparelQInput.value) || 0;
    const nonApparelQ = parseInt(this.nonApparelQInput.value) || 0;
    const printQ = parseInt(this.printQInput.value) || 0;

    const folding = this.foldingCheckbox.checked ? "foldingFee" : "sortingFee";
    const additionalFeeType = this.sortingCheckbox.checked && this.foldingCheckbox.checked ? "total" : folding;
  
    const isBulkShip = this.bulkshipRadio.checked;

    if (isBulkShip) {
      this.totalCosting =
        this.bulkShippingConfig.calculateTotalBulkShippingCost({
          totalLocations: destinations,
          apparelQuantity: apparelQ,
          nonApparelQuantity: nonApparelQ,
          printQuantity: printQ,
          boxSize: this.getBoxSize(isBulkShip).boxSize,
          additionalFeeType,
        });
    } else {
      this.totalCosting = this.dropshippingConfig.calculateTotalDropshipCost({
        totalDropshipOrders: noOfDropship,
        apparelQuantity: apparelQ,
        nonApparelQuantity: nonApparelQ,
        printQuantity: printQ,
        boxSize: this.getBoxSize(isBulkShip).boxSize,
        additionalFeeType,
      });
    }

  

    this.breakdownData = [
      {
        label: "Service Type",
        value: isBulkShip ? "Bulk Ship" : "Dropshipping",
      },
      {
        label: isBulkShip ? "Number of Destinations" : "Number of Dropships",
        value: isBulkShip ? destinations : noOfDropship,
      },
      { label: "Item Variant", value: itemVarient },
      { label: "Apparel Quantity", value: apparelQ },
      { label: "Non-Apparel Quantity", value: nonApparelQ },
      { label: "Total Quantity", value: apparelQ + nonApparelQ },
      { label: "Box Type", value: "Standard Box" },
      { label: "Dropship/Box Assembly", value: this.getBoxSize(isBulkShip).boxLabel },
    ];

    this.updateEstimateBreakdown();
    this.showStep(2);
    this.step2.querySelector("h2").textContent = `${this.totalCosting.toFixed(
      2
    )} USD`;
  }

  updateEstimateBreakdown() {
    this.listContainer.innerHTML = "";
    this.breakdownData.forEach((item) => {
      const block = document.createElement("div");
      block.classList.add("block-item");
      block.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
      this.listContainer.appendChild(block);
    });
  }

  showStep(step) {
    this.step1.classList.remove("active");
    this.step2.classList.remove("active");
    this.step3.classList.remove("active");
    this[`step${step}`].classList.add("active");
  }

  toggleActiveCard() {
    if (this.dropshipRadio.checked) {
      this.meawCard.classList.add("active");
    } else {
      this.meawCard.classList.remove("active");
    }
  }

  sendMailToAdmin(userInfo) {
    this.breakdownData.push({
      label: "Admin charge",
      value: `$${this.dropshippingConfig.fixedOperationalCosts.adminFee}`,
    });
    this.breakdownData.push({
      label: "Receiving Charge",
      value: `$${this.dropshippingConfig.fixedOperationalCosts.receivingFee}`,
    });
    const requestData = {
      user: userInfo,
      breakdown: this.breakdownData,
      totalCosting: this.totalCosting.toFixed(2),
    };

    this.submitBtn.innerHTML = "Loading...";
    this.submitBtn.disabled = true;

    fetch("mail.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    }).then((response) => response.json())
    .then((data) => {
      if (data.status) {
        this.showStep(4);
      } else {
        alert("Something want wrong try again!");
      }
      this.submitBtn.innerHTML = "Submit quote for confirmation";  
      this.submitBtn.disabled = false;
    })
    .catch((error) => {
      alert("Something want wrong try again!");
      this.submitBtn.innerHTML = "Submit quote for confirmation";  
      this.submitBtn.disabled = false;
    });
  }

  SubmitData(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      description: formData.get("description"),
    };
    this.sendMailToAdmin(user);
  }
}

// Initialize the calculator
document.addEventListener("DOMContentLoaded", () => {
  new CostCalculator();
});

let cstm = document.querySelector(".cstm");
function cstmAlrt() {
  cstm.classList.add("active");
}
function RcstmAlrt() {
  cstm.classList.remove("active");
}


