// Ensure the DOM is fully loaded before executing our code
document.addEventListener("DOMContentLoaded", function() {
    const tronWeb = window.tronWeb;
    const contractAddress = "TKc58kSi2VnE2DPoc9QwpqGkNjMCdV9iBo"; // Replace with your deployed contract address
    let contractInstance;

    // Ensure TronWeb is injected and available
    if (typeof tronWeb === 'undefined') {
        alert("TronWeb is not installed. Please install the TronLink extension!");
        return;
    }

    tronWeb.contract().at(contractAddress).then(instance => {
        contractInstance = instance;
        initApp();
    }).catch(error => {
        console.error("Error:", error);
        alert("There was an error fetching the contract instance.");
    });

    function initApp() {
        document.getElementById("viewButton").addEventListener("click", async () => {
            try {
                // User signs and sends 100 TRX to the contract
                await contractInstance.payAndView().send({
                    callValue: tronWeb.toSun(100) // Convert 100 TRX to SUN (the smallest unit)
                });

                // Fetch the updated count
                const count = await contractInstance.getViewersCount().call();
                document.getElementById("counterDisplay").innerText = count.toString();
            } catch (error) {
                console.error("Error:", error);
                alert("There was an error processing your request.");
            }
        });
    }
});
