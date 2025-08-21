// Price Alerts Management System
class AlertsManager {
  constructor() {
    this.alerts = this.loadAlerts();
    this.currentPrices = this.getCurrentPrices();

    this.initializeElements();
    this.bindEvents();
    this.updateAlertsDisplay();
    this.startPriceMonitoring();
  }

  initializeElements() {
    // Summary elements
    this.activeAlerts = document.getElementById("activeAlerts");
    this.triggeredToday = document.getElementById("triggeredToday");
    this.priceAboveAlerts = document.getElementById("priceAboveAlerts");
    this.priceBelowAlerts = document.getElementById("priceBelowAlerts");

    // Display elements
    this.emptyAlerts = document.getElementById("emptyAlerts");
    this.alertsList = document.getElementById("alertsList");

    // Modal elements
    this.addAlertBtn = document.getElementById("addAlertBtn");
    this.emptyAddAlertBtn = document.getElementById("emptyAddAlertBtn");
    this.createAlertModal = document.getElementById("createAlertModal");
    this.closeAlertModal = document.getElementById("closeAlertModal");
    this.cancelAlert = document.getElementById("cancelAlert");
    this.createAlertForm = document.getElementById("createAlertForm");

    // Form elements
    this.alertCryptoSelect = document.getElementById("alertCryptoSelect");
    this.alertType = document.getElementById("alertType");
    this.alertValue = document.getElementById("alertValue");
    this.alertName = document.getElementById("alertName");

    // Mobile menu
    this.mobileMenuBtn = document.getElementById("mobileMenuBtn");
    this.mobileMenu = document.getElementById("mobileMenu");
  }

  bindEvents() {
    // Add alert buttons
    this.addAlertBtn.addEventListener("click", () => this.showModal());
    this.emptyAddAlertBtn.addEventListener("click", () => this.showModal());

    // Modal controls
    this.closeAlertModal.addEventListener("click", () => this.hideModal());
    this.cancelAlert.addEventListener("click", () => this.hideModal());
    this.createAlertModal.addEventListener("click", (e) => {
      if (e.target === this.createAlertModal) this.hideModal();
    });

    // Form submission
    this.createAlertForm.addEventListener("submit", (e) =>
      this.handleCreateAlert(e)
    );

    // Alert type change
    this.alertType.addEventListener("change", () =>
      this.updateAlertValuePlaceholder()
    );

    // Mobile menu
    this.mobileMenuBtn.addEventListener("click", () => this.toggleMobileMenu());
  }

  loadAlerts() {
    const saved = localStorage.getItem("cryptoAlerts");
    return saved ? JSON.parse(saved) : [];
  }

  saveAlerts() {
    localStorage.setItem("cryptoAlerts", JSON.stringify(this.alerts));
  }

  getCurrentPrices() {
    // Simulated current prices (in real app, this would come from API)
    return {
      bitcoin: 43250.25,
      ethereum: 2650.75,
      dogecoin: 0.085,
      cardano: 0.52,
      solana: 98.45,
    };
  }

  showModal() {
    this.createAlertModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    this.createAlertForm.reset();
    this.updateAlertValuePlaceholder();
  }

  hideModal() {
    this.createAlertModal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }

  toggleMobileMenu() {
    this.mobileMenu.classList.toggle("hidden");
  }

  updateAlertValuePlaceholder() {
    const type = this.alertType.value;
    const input = this.alertValue;

    switch (type) {
      case "above":
      case "below":
        input.placeholder = "0.00";
        input.step = "0.01";
        break;
      case "change":
        input.placeholder = "5.00";
        input.step = "0.01";
        break;
    }
  }

  handleCreateAlert(e) {
    e.preventDefault();

    const cryptoId = this.alertCryptoSelect.value;
    const alertType = this.alertType.value;
    const value = parseFloat(this.alertValue.value);
    const name = this.alertName.value.trim();

    if (!cryptoId || !value || value <= 0) {
      alert("Please fill in all required fields with valid values");
      return;
    }

    // Create new alert
    const newAlert = {
      id: Date.now(),
      cryptoId,
      type: alertType,
      value,
      name: name || `${this.getCryptoName(cryptoId)} ${alertType} $${value}`,
      createdAt: new Date().toISOString(),
      isActive: true,
      triggered: false,
      triggeredAt: null,
    };

    this.alerts.push(newAlert);
    this.saveAlerts();
    this.updateAlertsDisplay();
    this.hideModal();
  }

  updateAlertsDisplay() {
    if (this.alerts.length === 0) {
      this.showEmptyState();
      return;
    }

    this.showAlertsList();
    this.updateAlertsSummary();
    this.renderAlertsList();
  }

  showEmptyState() {
    this.emptyAlerts.classList.remove("hidden");
    this.alertsList.classList.add("hidden");
    this.updateAlertsSummary();
  }

  showAlertsList() {
    this.emptyAlerts.classList.add("hidden");
    this.alertsList.classList.remove("hidden");
  }

  updateAlertsSummary() {
    const activeAlerts = this.alerts.filter((alert) => alert.isActive);
    const triggeredToday = this.alerts.filter(
      (alert) =>
        alert.triggered &&
        alert.triggeredAt &&
        new Date(alert.triggeredAt).toDateString() === new Date().toDateString()
    );
    const priceAboveAlerts = this.alerts.filter(
      (alert) => alert.type === "above" && alert.isActive
    );
    const priceBelowAlerts = this.alerts.filter(
      (alert) => alert.type === "below" && alert.isActive
    );

    this.activeAlerts.textContent = activeAlerts.length;
    this.triggeredToday.textContent = triggeredToday.length;
    this.priceAboveAlerts.textContent = priceAboveAlerts.length;
    this.priceBelowAlerts.textContent = priceBelowAlerts.length;
  }

  renderAlertsList() {
    this.alertsList.innerHTML = "";

    this.alerts.forEach((alert) => {
      const alertItem = this.createAlertItem(alert);
      this.alertsList.appendChild(alertItem);
    });
  }

  createAlertItem(alert) {
    const alertItem = document.createElement("div");
    alertItem.className = `bg-darker rounded-lg p-6 shadow-lg ${
      alert.triggered ? "border-l-4 border-yellow-400" : ""
    }`;

    const cryptoName = this.getCryptoName(alert.cryptoId);
    const currentPrice = this.currentPrices[alert.cryptoId] || 0;
    const status = this.getAlertStatus(alert, currentPrice);

    alertItem.innerHTML = `
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h4 class="text-lg font-semibold mb-2">${alert.name}</h4>
          <div class="flex items-center space-x-4 text-sm text-gray-400">
            <span>${cryptoName}</span>
            <span>•</span>
            <span class="capitalize">${alert.type}</span>
            <span>•</span>
            <span>$${alert.value.toFixed(2)}</span>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <span class="px-3 py-1 rounded-full text-xs font-semibold ${
            status.class
          }">${status.text}</span>
          <button 
            onclick="alertsManager.toggleAlert(${alert.id})"
            class="text-gray-400 hover:text-white transition-colors"
            title="${alert.isActive ? "Deactivate" : "Activate"} alert"
          >
            <i class="fas fa-${alert.isActive ? "pause" : "play"}"></i>
          </button>
          <button 
            onclick="alertsManager.deleteAlert(${alert.id})"
            class="text-red-400 hover:text-red-300 transition-colors"
            title="Delete alert"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      
      <div class="flex items-center justify-between text-sm">
        <div class="text-gray-400">
          <span>Current Price: $${currentPrice.toFixed(2)}</span>
          ${
            alert.triggered
              ? `<br><span class="text-yellow-400">Triggered: ${new Date(
                  alert.triggeredAt
                ).toLocaleString()}</span>`
              : ""
          }
        </div>
        <div class="text-gray-400">
          Created: ${new Date(alert.createdAt).toLocaleDateString()}
        </div>
      </div>
    `;

    return alertItem;
  }

  getAlertStatus(alert, currentPrice) {
    if (alert.triggered) {
      return { text: "Triggered", class: "bg-yellow-600 text-black" };
    }

    if (!alert.isActive) {
      return { text: "Paused", class: "bg-gray-600 text-white" };
    }

    let shouldTrigger = false;
    switch (alert.type) {
      case "above":
        shouldTrigger = currentPrice > alert.value;
        break;
      case "below":
        shouldTrigger = currentPrice < alert.value;
        break;
      case "change":
        // For percentage change, we'd need to track previous prices
        shouldTrigger = false;
        break;
    }

    if (shouldTrigger) {
      return { text: "Active", class: "bg-green-600 text-white" };
    }

    return { text: "Monitoring", class: "bg-blue-600 text-white" };
  }

  getCryptoName(cryptoId) {
    const names = {
      bitcoin: "Bitcoin",
      ethereum: "Ethereum",
      dogecoin: "Dogecoin",
      cardano: "Cardano",
      solana: "Solana",
    };
    return names[cryptoId] || cryptoId;
  }

  toggleAlert(alertId) {
    const alert = this.alerts.find((a) => a.id === alertId);
    if (alert) {
      alert.isActive = !alert.isActive;
      this.saveAlerts();
      this.updateAlertsDisplay();
    }
  }

  deleteAlert(alertId) {
    if (confirm("Are you sure you want to delete this alert?")) {
      this.alerts = this.alerts.filter((alert) => alert.id !== alertId);
      this.saveAlerts();
      this.updateAlertsDisplay();
    }
  }

  startPriceMonitoring() {
    // Simulate price monitoring (in real app, this would check API prices)
    setInterval(() => {
      this.checkAlerts();
    }, 30000); // Check every 30 seconds
  }

  checkAlerts() {
    this.alerts.forEach((alert) => {
      if (!alert.isActive || alert.triggered) return;

      const currentPrice = this.currentPrices[alert.cryptoId] || 0;
      let shouldTrigger = false;

      switch (alert.type) {
        case "above":
          shouldTrigger = currentPrice > alert.value;
          break;
        case "below":
          shouldTrigger = currentPrice < alert.value;
          break;
        case "change":
          // Percentage change logic would go here
          break;
      }

      if (shouldTrigger) {
        this.triggerAlert(alert);
      }
    });
  }

  triggerAlert(alert) {
    alert.triggered = true;
    alert.triggeredAt = new Date().toISOString();
    this.saveAlerts();

    // Show notification
    this.showNotification(alert);

    // Update display
    this.updateAlertsDisplay();
  }

  showNotification(alert) {
    // Create browser notification if supported
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Crypto Price Alert!", {
        body: `${alert.name} has been triggered!`,
        icon: "/favicon.ico",
      });
    }

    // Show in-app notification
    this.showInAppNotification(alert);
  }

  showInAppNotification(alert) {
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-yellow-600 text-black px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm";
    notification.innerHTML = `
      <div class="flex items-start space-x-3">
        <i class="fas fa-bell text-xl mt-1"></i>
        <div class="flex-1">
          <h4 class="font-semibold mb-1">Price Alert Triggered!</h4>
          <p class="text-sm">${alert.name}</p>
          <p class="text-xs mt-2 opacity-75">${new Date().toLocaleTimeString()}</p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="text-black hover:text-gray-700">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 10000);
  }
}

// Initialize the alerts manager when DOM is loaded
let alertsManager;
document.addEventListener("DOMContentLoaded", () => {
  alertsManager = new AlertsManager();

  // Request notification permission
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
});
