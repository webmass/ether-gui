export const basicERC20Abi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    // Authenticated Functions
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (boolean)",
    "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
    "function approve(address spender, uint256 value) public returns (bool success)",
    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)"
];