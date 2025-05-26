// Test cases for getWeatherData function

// Mock fetch for testing (if running in Node.js, use node-fetch or similar)
// For browser-based testing, you may need to use a testing framework like Jest with fetch-mock

async function runWeatherAppTests() {
    const testCases = [
        {
            name: "Valid City Name",
            input: "London",
            expectError: false
        },
        {
            name: "Valid City Name with Spaces",
            input: "New York",
            expectError: false
        },
        {
            name: "Invalid City Name",
            input: "Xyzabc",
            expectError: true,
            expectedError: "City not found."
        },
        {
            name: "Empty Input",
            input: "",
            expectError: true,
            expectedError: "Please provide a valid city name."
        },
        {
            name: "City Name with Special Characters",
            input: "São Paulo",
            expectError: false
        },
        {
            name: "Non-String Input",
            input: 12345,
            expectError: true,
            expectedError: "Please provide a valid city name."
        }
        // Network and API failure cases would require mocking fetch
    ];

    for (const test of testCases) {
        try {
            const result = await getWeatherData(test.input);
            if (test.expectError) {
                if (result.error && (!test.expectedError || result.error === test.expectedError)) {
                    console.log(`✅ ${test.name}: Passed (${result.error})`);
                } else {
                    console.error(`❌ ${test.name}: Failed (Expected error "${test.expectedError}", got "${result.error}")`);
                }
            } else {
                if (result.city && typeof result.temperature_celsius === "number") {
                    console.log(`✅ ${test.name}: Passed (City: ${result.city}, Temp: ${result.temperature_celsius}°C)`);
                } else {
                    console.error(`❌ ${test.name}: Failed (Expected valid result, got ${JSON.stringify(result)})`);
                }
            }
        } catch (err) {
            console.error(`❌ ${test.name}: Exception thrown (${err})`);
        }
    }
}

// Run tests (uncomment the line below to execute)
runWeatherAppTests();