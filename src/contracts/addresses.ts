export const ADDRESSES = {
  PrivateCreditScore: "0xaa7D007ede04C1c52D7cc95A8357813c394f3af6",
  ConfidentialPayroll: "0x9Fc72dc9EbD48fB5f6115C0Ea875d56abED64f95",
  HiddenPortfolio: "0x4708F4c5Afc818B9cF42c1652666aC67034866ae",
};

export const CREDIT_SCORE_ABI = [
  "function submitCreditData(uint64 balance, uint32 txCount) external",
  "function getMyEligibility() external view returns (bytes32)",
  "function hasProfile(address user) external view returns (bool)",
];

export const PAYROLL_ABI = [
  "function addEmployee(address employee) external",
  "function setSalary(address employee, uint64 salary) external",
  "function getMySalary(address employer) external view returns (uint64)",
  "function getSalary(address employer, address employee) external view returns (bytes32)",
  "function isEmployee(address employer, address employee) external view returns (bool)",
  "function getEmployeeCount(address employer) external view returns (uint256)",
];

export const PORTFOLIO_ABI = [
  "function registerPortfolio(uint64 balance) external",
  "function updatePortfolio(uint64 balance) external",
  "function proveAboveThreshold(uint64 threshold) external returns (bytes32)",
  "function hasPortfolio(address) external view returns (bool)",
];
