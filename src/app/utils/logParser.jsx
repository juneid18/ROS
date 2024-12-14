export const parseLogs = (file, callback) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const content = event.target.result;
    let parsedLogs = [];

    try {
      // Check file extension
      if (file.name.endsWith(".json")) {
        // Parse JSON file
        const jsonData = JSON.parse(content);

        // Validate and map JSON data
        if (!Array.isArray(jsonData)) {
          throw new Error("Invalid JSON structure: Expected an array.");
        }

        parsedLogs = jsonData.map((entry) => {
          if (!entry["Last Updated"] || !entry["Robot ID"]) {
            throw new Error("Missing required fields in JSON.");
          }

          const severity = entry["Online/Offline"]
            ? entry["Battery Percentage"] < 20
              ? "ERROR"
              : "INFO"
            : "WARN";
        //   const message = `Battery: ${entry["Battery Percentage"]}% | CPU: ${
        //     entry["CPU Usage"]
        //   }% | RAM: ${entry["RAM Consumption"]} MB | Location: (${entry[
        //     "Location Coordinates"
        //   ].join(", ")})`;

          return {
            node: entry["Robot ID"],
            severity,
            active: entry["Online/Offline"],
            battery: entry["Battery Percentage"],
            CPU: entry["CPU Usage"],
            RAM: entry["RAM Consumption"],
            timestamp: entry["Last Updated"],
            // message,
          };
        });
      } else {
        // Parse TXT file line-by-line
        parsedLogs = content.split("\n").map((line, index) => {
          const [timestamp, severity, ...messageParts] = line.split(" ");
          if (!timestamp || !severity) {
            throw new Error(`Invalid TXT structure at line ${index + 1}`);
          }

          return {
            timestamp,
            severity: messageParts.join(" ").split(']')[0].replace('[', '').trim(),
            message: messageParts.join(" ") || "No message provided",
          };
        });
      }
      //  else {
      //   throw new Error("Unsupported file format.");
      // }

      callback(parsedLogs);
    } catch (error) {
      console.error("Error parsing logs:", error.message);
      callback([]); // Return an empty array on failure
    }
  };

  reader.onerror = () => {
    console.error("Error reading the file.");
    callback([]);
  };

  reader.readAsText(file);
};
