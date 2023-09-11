document.addEventListener("DOMContentLoaded", function() {
    const contractAddress = "TKc58kSi2VnE2DPoc9QwpqGkNjMCdV9iBo";
    let contractInstance;

    const connectBtn = document.getElementById("connectWallet");
    const viewBtn = document.getElementById("viewButton");

    function checkTronWeb(retries = 5) {
        if (retries === 0) {
            alert("TronWeb is not installed. Please install the TronLink extension!");
            return;
        }

        if (window.tronWeb && window.tronWeb.ready) {
            initApp();
        } else {
            console.log("Waiting for TronWeb...");
            setTimeout(() => checkTronWeb(retries - 1), 1000);
        }
    }

    function initApp() {
        console.log("TronWeb detected!");

        connectBtn.addEventListener("click", async () => {
            try {
                const addresses = await window.tronWeb.request({ method: 'tron_requestAccounts' });
                if (addresses.length) {
                    connectBtn.style.display = "none";
                    viewBtn.style.display = "block";
                    document.getElementById("connectedAddress").innerText = "Connected Address: " + addresses[0]; // Added this line
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Failed to connect TronLink wallet.");
            }
        });

        window.tronWeb.contract().at(contractAddress).then(instance => {
            contractInstance = instance;
        }).catch(error => {
            console.error("Error:", error);
            alert("There was an error fetching the contract instance.");
        });

        viewBtn.addEventListener("click", async () => {
            try {
                await contractInstance.clickButton().send({
                    callValue: window.tronWeb.toSun(100)
                });

                const count = await contractInstance.getClickCount().call();
                document.getElementById("counterDisplay").innerText = count.toString();
            } catch (error) {
                console.error("Error:", error);
                alert("There was an error processing your request.");
            }
        });
    }

    checkTronWeb();
});
