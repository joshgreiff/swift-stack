// EmailJS Configuration
const emailConfig = {
    publicKey: 'YOUR_PUBLIC_KEY_HERE', // Replace with your actual public key
    serviceId: 'YOUR_SERVICE_ID_HERE', // Replace with your service ID (e.g., service_abc123)
    templateId: 'YOUR_TEMPLATE_ID_HERE' // Replace with your template ID (e.g., template_xyz789)
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = emailConfig;
} 