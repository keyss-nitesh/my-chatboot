// PWA Install Prompt Handler

let deferredPrompt = null;

// Listen for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('💾 PWA install prompt available');
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;

  // Show custom install button/banner if needed
  showInstallPromotion();
});

// Handle app installed
window.addEventListener('appinstalled', () => {
  console.log('✅ PWA was installed successfully!');
  deferredPrompt = null;
});

// Function to show install promotion
function showInstallPromotion() {
  // You can show a custom UI here
  console.log('📱 App can be installed!');
}

// Function to trigger install prompt
export async function installPWA() {
  if (!deferredPrompt) {
    console.log('❌ Install prompt not available');
    return false;
  }

  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;

  if (outcome === 'accepted') {
    console.log('✅ User accepted the install prompt');
  } else {
    console.log('❌ User dismissed the install prompt');
  }

  // Clear the deferredPrompt
  deferredPrompt = null;
  return outcome === 'accepted';
}

// Check if app is already installed
export function isPWAInstalled() {
  // Check if running in standalone mode
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
}

// Export for use in components
export { deferredPrompt };
