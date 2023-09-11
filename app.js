document.addEventListener("DOMContentLoaded", function() {
    const tronWeb = window.tronWeb;
    const contractAddress = "TKc58kSi2VnE2DPoc9QwpqGkNjMCdV9iBo"; // Replace with your deployed contract address
    let contractInstance;

    const connectBtn = document.getElementById("connectWallet");
    const viewBtn = document.getElementById("viewButton");

    // Ensure TronWeb is injected and available
    if (typeof tronWeb === 'undefined') {
        alert("TronWeb is not installed. Please install the TronLink extension!");
        return;
    }

    connectBtn.addEventListener("click", async () => {
        try {
            // Request user's account address
            const addresses = await tronWeb.request({ method: 'tron_requestAccounts' });
            if (addresses.length) {
                connectBtn.style.display = "none";
                viewBtn.style.display = "block";
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to connect TronLink wallet.");
        }
    });

    tronWeb.contract().at(contractAddress).then(instance => {
        contractInstance = instance;
    }).catch(error => {
        console.error("Error:", error);
        alert("There was an error fetching the contract instance.");
    });

    viewBtn.addEventListener("click", async () => {
        try {
            // User signs and sends 100 TRX to the contract
            await contractInstance.clickButton().send({
                callValue: tronWeb.toSun(100) // Convert 100 TRX to SUN (the smallest unit)
            });

            // Fetch the updated count
            const count = await contractInstance.getClickCount().call();
            document.getElementById("counterDisplay").innerText = count.toString();
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error processing your request.");
        }
    });
});
