"use client";
import Link from "next/link"; // Ensure you are using Link if it's needed, otherwise remove this line
import { useState, useEffect } from "react"; // Import useState and useEffect hooks
import styles from "./index.module.css";
import { CovalentClient } from "@covalenthq/client-sdk";

export default function Home() {
    const [balanceData, setBalanceData] = useState(null); // State to store the API data

    useEffect(() => {
        const fetchApiData = async () => {
            try {
                const client = new CovalentClient("SECRET");
                const resp =
                    await client.BalanceService.getHistoricalTokenBalancesForWalletAddress(
                        "eth-mainnet",
                        "0xae78736Cd615f374D3085123A210448E74Fc6393",
                        { quoteCurrency: "USD", date: "2024-02-09" }
                    );
                if (resp) {
                    setBalanceData(resp); // Store the API data in state
                    console.log(resp);
                } else {
                    // Handle the case where resp.data is null or undefined
                    console.error(
                        "API call succeeded but did not return data."
                    );
                }
            } catch (error) {
                console.error("API call failed:", error);
                // Optionally set some state here to show an error message in the UI
            }
        };
        fetchApiData(); // Call the function to fetch API data
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <main>
            <div>
                <div>
                    {/* Display API data if available */}
                    {balanceData ? (
                        <div>
                            <h2>Balance Data:</h2>
                            <pre>
                                {JSON.stringify(
                                    balanceData,
                                    (key, value) =>
                                        typeof value === "bigint"
                                            ? value.toString()
                                            : value, // Convert BigInt to string
                                    2
                                )}
                            </pre>{" "}
                            {/* Displaying the data with BigInt handling */}
                        </div>
                    ) : (
                        <div>Loading balance data...</div>
                    )}
                </div>
                <div>{/* Other components */}</div>
            </div>
        </main>
    );
}
