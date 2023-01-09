const reference = [
  {name: "ONE HUNDRED", val: 100},
  {name: "TWENTY", val: 20},
  {name: "TEN", val: 10},
  {name: "FIVE", val: 5},
  {name: "ONE", val: 1},
  {name: "QUARTER", val: 0.25},
  {name: "DIME", val: 0.1},
  {name: "NICKEL", val: 0.05},
  {name: "PENNY", val: 0.01}
]

function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let output = {status: null, change: []};
  
  //Determining all the money in the register:
  let cashRegister = cid.reduce(function(acc, curr) {
    acc.total += curr[1];
    acc[curr[0]] = curr[1];
    return acc;
  }, {total: 0});

  //Case 2 (change is equal to what's in the register):
  if (cashRegister.total === change) {
    output.status = "CLOSED";
    output.change = cid;
    return output;
  }

  //Case 1a (there's less money in register than the change I must give)
  if (cashRegister.total < change) {
    output.status = "INSUFFICIENT_FUNDS";
    return output;
  }

  //Calculating if it's possible to give change:
  let changeArray = reference.reduce(function(acc, curr) {
    let money = 0;
    while (cashRegister[curr.name] > 0 && change >= curr.val) {
      change -= curr.val;
      cashRegister[curr.name] -= curr.val;
      money += curr.val;
      change = Math.round(change * 100)/100; //Rounds with two decimals
    }
    if (money > 0) {
      acc.push([curr.name, money]);
    }
    return acc;
  }, []);

  //Case 1b (there's not the appropiate coins/bills to give change)
  if (changeArray.length < 1 || change > 0) {
    output.status = "INSUFFICIENT_FUNDS";
    return output;   
  }

  //Case 3 (we can give change)
  output.status = "OPEN";
  output.change = changeArray;
  return output;

}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1],
["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
