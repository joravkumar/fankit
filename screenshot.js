const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function takeScreenshot(url, fileName) {
  console.log(`🚀 Starting browser to capture: ${url}...`);

  // Launch a local headless browser
  const browser = await puppeteer.launch({
    headless: "new", // Uses the modern headless mode
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // Set standard Social Media Open Graph dimensions (1200x630)
    await page.setViewport({ width: 1200, height: 630 });

    // Navigate to the URL and wait for the network to be idle
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Create a 'screenshots' folder if it doesn't exist
    const dir = path.join(__dirname, "screenshots");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const filePath = path.join(dir, fileName);

    // Capture and save the screenshot
    await page.screenshot({
      path: filePath,
      type: "png",
    });

    console.log(`✅ Success! Saved to: ${filePath}`);
  } catch (error) {
    console.error("❌ Error capturing screenshot:", error);
  } finally {
    await browser.close();
  }
}

// Get URL and Filename from command line arguments or use defaults
const targetUrl = process.argv[2] || "https://nextjs.org";
const outputName = process.argv[3] || "preview.png";

takeScreenshot(targetUrl, outputName);
