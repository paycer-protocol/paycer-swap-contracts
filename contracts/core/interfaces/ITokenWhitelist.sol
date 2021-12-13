pragma solidity =0.5.16;

interface ITokenWhitelist {
    function isWhitelisted(address) external view returns (bool);
}