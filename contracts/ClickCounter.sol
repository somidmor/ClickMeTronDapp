pragma solidity ^0.8.6;

contract ClickCounter {
    uint256 public clickCount = 0;
    uint256 public constant CLICK_COST = 100 trx;

    function clickButton() public payable {
        require(msg.value == CLICK_COST, "Must send 100 TRX to click the button");
        clickCount += 1;
    }

    function getClickCount() public view returns (uint256) {
        return clickCount;
    }
}